import { Inject, Injectable } from '@angular/core';
import { FirebaseChatService } from '../../firebase-ai/services/firebase-chat.service';
import { FirebaseApp } from '@angular/fire/app';
import { IVertexAiFunctionCall } from '../../firebase-ai/services/function-call';
import { AddToCartFunctionCall, GetMyRecentOrdersFunctionCall, GetRestaurantsFunctionCall } from '../function-calls/restaurant-function-calls';
import { RestaurantService } from '../../core/services/restaurant.service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantFirebaseChatService extends FirebaseChatService {

  constructor(@Inject("FIREBASE_APP") firebaseApp: FirebaseApp, private restaurantService: RestaurantService) {
    super(firebaseApp);
  }

  protected override initializeFunctionCalls(): IVertexAiFunctionCall[] {
    return [new GetRestaurantsFunctionCall(this.restaurantService), new AddToCartFunctionCall(this.restaurantService), new GetMyRecentOrdersFunctionCall(this.restaurantService)];
  }

  protected override getSystemInstruction(): string {
    return "Welcome to Hungry, Hungry Hip-AI. You are hungry and our AI will assist users by answering questions about the restaurant menu options and even being able to add items to the cart.";
  }
}
