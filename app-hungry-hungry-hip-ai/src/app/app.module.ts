import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { ChatWindowComponent } from './components/chat-window/chat-window.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { CartComponent } from './components/cart/cart.component';
import { provideHttpClient } from '@angular/common/http';
import { ChatService } from './modules/core/services/chat-service';
import { RestaurantFirebaseChatService } from './modules/restaurant-firebase-ai/services/restaurant-firebase-chat.service';

const firebaseApp = initializeApp(environment.firebase);

@NgModule({
  declarations: [
    AppComponent,
    DashboardPageComponent,
    ChatWindowComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule
  ],
  providers: [
    { provide: ChatService, useClass: RestaurantFirebaseChatService },
    provideFirebaseApp(()=> firebaseApp),
    {
      provide: "FIREBASE_APP", useValue: firebaseApp
    },
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
