import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CesarService {

  constructor() { }

  decode(encode: string, offset: number) : string{
    let charArray = Array.from(encode);
    let encodedArray = [];

    for (const char of charArray){
      let charCode = char.charCodeAt(0);
      let newChar = String.fromCharCode(charCode - offset);
      encodedArray.push(newChar);
    }

    return encodedArray.join('')
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
    return encodedArray.join('');
  }
}


