import { TestBed } from '@angular/core/testing';

import { FirebaseChatService } from './firebase-chat.service';

describe('ChatService', () => {
  let service: FirebaseChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
