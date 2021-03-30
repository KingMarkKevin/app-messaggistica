import { HtmlAstPath } from '@angular/compiler';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CesarService } from './cesar.service';
import { SocketService } from './socket.service';
import { CryptoService } from './crypto.service';
import { FormData } from './form.data.model';


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
  offsetVal : string;
  message: string;

  getOffset(offset: HTMLInputElement) {
    this.offsetVal = offset.value;

  }

  constructor(
    private socketService: SocketService,
    private cesarService: CesarService,
    private cryptoService: CryptoService
    ) {}

  sendMessage(formData : FormData) {
    console.log("form input: " + JSON.stringify(formData));

    let encoded: FormData = formData;
    switch (formData.messageType) {
      case "cesar":
        encoded.message = this.cesarService.encode(formData.message, Number(this.offsetVal));
        break;
      
      case "t-des":
        encoded.message = this.cryptoService.encodeDes(formData.message, this.offsetVal);
        break;
    }

    this.socketService.sendMessage(JSON.stringify(encoded));

    this.message = ""
    /*let encoded = this.cesarService.encode(message.value, Number(this.offsetVal));
    this.socketService.sendMessage(encoded);

    console.log("sent: " + encoded);
    message.value = "";*/
    
  }

  decodeData = (messageData: string) => {
    let received: FormData = JSON.parse(messageData);
    console.log("message received: " + JSON.stringify(received));

    switch (received.messageType) {
      case "cesar":
        received.message = this.cesarService.decode(received.message, Number(this.offsetVal));
        break;
      
      case "t-des":
        received.message = this.cryptoService.decodeDes(received.message, this.offsetVal);
        break;
    }

    this.messageList.push("messagio cifrato: " + messageData + " messaggio decifrato " + JSON.stringify(received))

    /*let decoded = this.cesarService.decode(message, Number(this.offsetVal))
    
    this.messageList.push(decoded);
    this.codedList.push(message);
    console.log("message received: " + decoded)*/
  }

  ngOnInit() {
    this.obs = this.socketService.getMessage();
    this.obs.subscribe(this.decodeData);
  }
  /*ngOnInit() {
    this.socketService.getMessage().subscribe((message: string) => {
      let decoded = this.cesarService.decode(message, 7)
      this.messageList.push(message);
      console.log("message received:", decoded)
    });
  }*/
}
