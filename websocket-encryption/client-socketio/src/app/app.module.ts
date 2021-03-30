import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { SocketService } from './socket.service';
import { CesarService } from './cesar.service';
import { CryptoService } from './crypto.service';
import { FormsModule } from '@angular/forms';

const config: SocketIoConfig = { url: 'http://127.0.0.1:3000', options: {}};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    FormsModule
  ],
  providers: [SocketService, CesarService, CryptoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
