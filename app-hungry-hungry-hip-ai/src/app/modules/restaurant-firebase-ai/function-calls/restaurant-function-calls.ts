import { ChatSession, FunctionCall, FunctionDeclaration, ObjectSchemaInterface, Schema } from "@angular/fire/vertexai";
import { IVertexAiFunctionCall } from "../../firebase-ai/services/function-call";
import { RestaurantService } from "../../core/services/restaurant.service";
import { firstValueFrom } from "rxjs";
import { MenuItem } from "../../core/domain/restaurant";

export class GetRestaurantsFunctionCall implements IVertexAiFunctionCall {
  private static readonly functionName: string = "getRestaurants";

  constructor(private restaurantService: RestaurantService) {}

  declareFunctionDeclaration(): FunctionDeclaration {
    return {
      name: GetRestaurantsFunctionCall.functionName,
      description:
        "Get an array of the restaurants with the menu, categories and menu items which have the name and price of each menu item.",
    };
  }
  getFunctionName(): string {
    return GetRestaurantsFunctionCall.functionName;
  }
  async generateResult(chatSession: ChatSession, functionCall: FunctionCall): Promise<string> {
    const functionResult = await firstValueFrom(this.restaurantService.getRestaurants());
    const result = await chatSession.sendMessage([
      {
        functionResponse: {
          name: this.getFunctionName(),
          response: { restaurants: functionResult },
        },
      },
    ]);
    return result.response.text();
  }
}

export class AddToCartFunctionCall implements IVertexAiFunctionCall {
  private static readonly functionName: string = "addToCart";
  constructor(private restaurantService: RestaurantService) {}

  declareFunctionDeclaration(): FunctionDeclaration {
    return {
      name: AddToCartFunctionCall.functionName,
      description: "Add one or more menu items to the cart.",
      parameters: Schema.object({
        properties: {
          menuItemsToAdd: Schema.array({
            items: Schema.object({
              description: "A single menu item with its name and price.",
              properties: {
                id: Schema.number({
                  description: "The numerical id of the menu item.",
                }),
                name: Schema.string({
                  description: "The name of the menu item.",
                }),
                description: Schema.string({
                  description: "The description of the menu item.",
                }),
                price: Schema.number({
                  description: "The numerical price of the menu item.",
                })

              },
              // Specify which properties within each menu item object are required
              required: ["name", "price"],
            }),
          }),
        },
      }) as ObjectSchemaInterface,
    };
  }
  getFunctionName(): string {
    return AddToCartFunctionCall.functionName;
  }
  async generateResult(chatSession: ChatSession, functionCall: FunctionCall): Promise<string> {
    console.log('Getting result', functionCall);
    const args = functionCall.args as { menuItemsToAdd: MenuItem[] }

    const functionResult = this.restaurantService.addAllToCart(args.menuItemsToAdd);

    const result = await chatSession.sendMessage([
      {
        functionResponse: {
          name: functionCall.name,
          response: { numberOfProductsAdded: functionResult },
        },
      }
    ]);
    return result.response.text();
  }
}

export class GetMyRecentOrdersFunctionCall implements IVertexAiFunctionCall {
  private static readonly functionName: string = "getMyRecentOrders";

  constructor(private restaurantService: RestaurantService) {}

  declareFunctionDeclaration(): FunctionDeclaration {
    return {
      name: GetMyRecentOrdersFunctionCall.functionName,
      description:
        "Get an array of my most recent orders with the menu items that were ordered.",
    };
  }
  getFunctionName(): string {
    return GetMyRecentOrdersFunctionCall.functionName;
  }
  async generateResult(chatSession: ChatSession, functionCall: FunctionCall): Promise<string> {
    const functionResult = await firstValueFrom(this.restaurantService.getMyRecentOrders());
    const result = await chatSession.sendMessage([
      {
        functionResponse: {
          name: this.getFunctionName(),
          response: { orders: functionResult },
        },
      },
    ]);
    return result.response.text();
  }
}