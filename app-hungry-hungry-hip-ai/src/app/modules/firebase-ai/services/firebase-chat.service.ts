import { ChatService } from '../../core/services/chat-service';
import { IVertexAiFunctionCall } from './function-call';
import { FirebaseApp } from '@angular/fire/app';
import { ChatSession, FunctionDeclarationsTool, GenerativeModel, getGenerativeModel, getVertexAI } from '@angular/fire/vertexai';

export abstract class FirebaseChatService extends ChatService {

  private model!: GenerativeModel;
  private chatSession!: ChatSession;
  private functionCallInventory: Record<string, IVertexAiFunctionCall> = {};
  private static isInitialized: boolean = false;
  constructor(private firebaseApp: FirebaseApp) {
    super();
  }

  override async ask(prompt: string): Promise<string> {
    let result = await this.chatSession.sendMessage(prompt);
    let toReturn: Promise<string> = Promise.resolve(result?.response.text() ?? 'Having issues getting an answer....');
    const functionCalls = result.response.functionCalls();
    if (functionCalls && functionCalls.length > 0) {
      for (const functionCall of functionCalls) {
        const functionToCall = this.functionCallInventory[functionCall.name];
        if (functionToCall) {
          toReturn = functionToCall.generateResult(this.chatSession, functionCall);
          break;
        }
      }
    }
    return toReturn;
  }

  public override initialize(): void {
    if (!FirebaseChatService.isInitialized) {
      const functionCalls = this.initializeFunctionCalls();
      if (functionCalls) {
        this.registerFunctionCalls(functionCalls);
      }
      FirebaseChatService.isInitialized = true;
    }
  }

  protected getModelVersion(): string {
    return "gemini-2.0-flash";
  }

  /**
   * Function used to get all of function calls available and register them w/ firebase/vertex-ai
   */
  protected abstract initializeFunctionCalls(): IVertexAiFunctionCall[];

  protected abstract getSystemInstruction(): string;

  private registerFunctionCalls(functionCalls: IVertexAiFunctionCall[]): void {
    if (!Array.isArray(functionCalls)) {
      return;
    }

    const functionDeclarations = [];
    for (const functionCall of functionCalls) {
      this.functionCallInventory[functionCall.getFunctionName()] = functionCall;
      functionDeclarations.push(functionCall.declareFunctionDeclaration());
    }
    // Initialize the Vertex AI service
    const vertexAI = getVertexAI(this.firebaseApp);

    const functionCallingTools: FunctionDeclarationsTool = {
      functionDeclarations: functionDeclarations
    };

    // Initialize the generative model with a model that supports your use case
    this.model = getGenerativeModel(vertexAI, {
      model: this.getModelVersion(),
      systemInstruction: this.getSystemInstruction(),
      tools: [functionCallingTools],
    });

    this.chatSession = this.model.startChat();
  }
}
