import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Message } from '../../modules/core/domain/message';
import { ChatService } from '../../modules/core/services/chat-service';

@Component({
  selector: 'app-chat-window',
  standalone: false,
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.scss'
})
export class ChatWindowComponent implements OnInit, OnChanges {
  @Input() messages: Message[] = [];
  @ViewChild('messageList') private messageList!: ElementRef;
  newMessageText = '';

  constructor(private chatService: ChatService) {
  }
  ngOnInit(): void {
    this.chatService.initialize();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.isPropertyChanged(changes, 'messages')) {
      this.scrollToBottom();
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private isPropertyChanged(changes: SimpleChanges, propertyName: string): boolean {
    if (changes[propertyName]) {
      const currentValue = changes[propertyName].currentValue;
      const previousValue = changes[propertyName].previousValue;

      return (currentValue !== previousValue);
    }
    return false;
  }

  async sendMessage() {
    const sentMessage = this.newMessageText.trim();
    if (sentMessage !== '') {
      this.newMessageText = '';
      const newMessage: Message = {
        sender: 'You',
        text: sentMessage,
        timestamp: new Date(),
      };
      this.messages = [...this.messages, newMessage];

      const response = await this.chatService.ask(newMessage.text);
      const chatResponseMessage: Message = {
        sender: 'HipAI',
        text: response,
        timestamp: new Date(),
      };
      this.messages = [...this.messages, chatResponseMessage];
    }
  }

  private scrollToBottom() {
    try {
      this.messageList.nativeElement.scrollTop = this.messageList.nativeElement.scrollHeight;
    } catch (err) { }
  }
}
