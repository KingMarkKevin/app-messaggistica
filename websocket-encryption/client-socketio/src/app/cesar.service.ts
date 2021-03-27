import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CesarService {

  constructor() { }

  decode(encode: string, offset: number) : string{
    var decoded = "";
    for(var i = 0; i < encode.length; i++) {
        var encrChar = encode.charCodeAt(i);
        if(encrChar >= 97 && encrChar <= 122) {
            decoded += String.fromCharCode((encrChar-97 - offset + 26) %26 + 97 );
        } else if(encrChar >= 65 && encrChar <= 90) {
            decoded += String.fromCharCode((encrChar-65 - offset + 26) %26 + 65 );
        } 
    }
    return decoded;
  }

  encode(toEncode: string, offset: number) : string
  {
    let charArray = Array.from(toEncode);
    let encodedArray = [];

    for (const char of charArray) {
      let charCode = char.charCodeAt(0);
      let newChar = String.fromCharCode(charCode + offset)
      encodedArray.push(newChar);
    }
    return encodedArray.join("");
  }
}


