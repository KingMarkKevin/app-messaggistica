import { Component } from '@angular/core';
import { CesarService } from './cesar.service';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client-socketio';
  messageList: string[] = [];

  constructor(
    private socketService: SocketService,
    private cesarService: CesarService
    ) {}

  sendMessage(message: HTMLInputElement) {
    let encoded = this.cesarService.encode(message.value, 7);
    this.socketService.sendMessage(encoded);

    console.log("sent: " + encoded);
    message.value = "";
    
  }

  ngOnInit() {
    this.socketService.getMessage().subscribe((message: string) => {
      let decoded = this.cesarService.decode(message, 7)
      this.messageList.push(decoded);
      console.log("message received:", decoded)
    });
  }
}
