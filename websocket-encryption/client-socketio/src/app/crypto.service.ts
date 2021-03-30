import { Injectable } from '@angular/core';
import * as Crypto from 'crypto-js';

@Injectable()

export class CryptoService {
  decodeDes(encoded: string, desKey: string) : string {
    return Crypto.TripleDES.decrypt(encoded, desKey).toString(Crypto.enc.Utf8);
  }

  encodeDes(toEncode: string,  desKey : string) : string {
    return Crypto.TripleDES.encrypt(toEncode, desKey).toString();
  }
}
