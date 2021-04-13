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

  encodeAes(toEncode: string, aesKey: string) : string {
    return Crypto.AES.encrypt(toEncode, aesKey).toString();
    //var encoded = Crypto.AES.encrypt(toEncode, aesKey);
    //return encoded.toString();
  }

  decodeAes(encoded: string, aesKey: string) : string {
    return Crypto.AES.decrypt(encoded, aesKey).toString(Crypto.enc.Utf8);
    /*var code = Crypto.AES.decrypt(encoded, aesKey);
    var decoded = code.toString(Crypto.enc.Utf8);

    return decoded;*/
  }
}
