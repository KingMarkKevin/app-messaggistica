import { HtmlAstPath } from '@angular/compiler';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
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
  obs : Observable<unknown>;
  codedList: string[] = [];
  offsetVal : string

  getOffset(offset: HTMLInputElement) {
    this.offsetVal = offset.value;

  }

  constructor(
    private socketService: SocketService,
    private cesarService: CesarService
    ) {}

  sendMessage(message: HTMLInputElement) {
    let encoded = this.cesarService.encode(message.value, Number(this.offsetVal));
    this.socketService.sendMessage(encoded);

    console.log("sent: " + encoded);
    message.value = "";
    
  }

  receiveMessage = (message: string) => {
    let decoded = this.cesarService.decode(message, Number(this.offsetVal))
    
    this.messageList.push(decoded);
    this.codedList.push(message);
    console.log("message received: " + this.offsetVal)
  }

  ngOnInit() {
    this.obs = this.socketService.getMessage();
    this.obs.subscribe(this.receiveMessage);
  }

  /*ngOnInit() {
    this.socketService.getMessage().subscribe((message: string) => {
      let decoded = this.cesarService.decode(message, 7)
      this.messageList.push(message);
      console.log("message received:", decoded)
    });
  }*/
}
