import { IFunctionCall } from "../ai/function-call";

/**
 * Interface used to define a chat-service, allowing different implementations to be used
 */
export abstract class ChatService {
  /**
   * Function used to chat by asking a prompt
   * @param prompt The human-readable prompt from the user
   */
  abstract ask(prompt: string): Promise<string>

  /**
   * Function used to do any initialization the chat service requires.  
   * Should be called from ngInit()
   */
  abstract initialize(): void;
}
