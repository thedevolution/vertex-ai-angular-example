import { ChatSession, FunctionCall, FunctionDeclaration } from "@angular/fire/vertexai";
import { IFunctionCall } from "../../core/ai/function-call";

/**
 * Interface used to structure function calls using fire/vertexai
 */
export interface IVertexAiFunctionCall extends IFunctionCall {
  /**
   * Function used to declare the function call, including function name, arguements and return type
   */
  declareFunctionDeclaration(): FunctionDeclaration;

  /**
   * Function which actually calls the function/service and returns the vertex response string
   * @param chatSession ChatSession class that enables sending chat messages and stores history of sent and received messages so far.
   * @param functionCall 
   */
  generateResult(chatSession: ChatSession, functionCall: FunctionCall): Promise<string>;
}
