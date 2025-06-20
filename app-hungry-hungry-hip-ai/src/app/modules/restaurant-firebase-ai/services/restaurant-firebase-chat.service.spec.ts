import { TestBed } from '@angular/core/testing';

import { RestaurantFirebaseChatService } from './restaurant-firebase-chat.service';

describe('RestaurantFirebaseChatService', () => {
  let service: RestaurantFirebaseChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestaurantFirebaseChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
