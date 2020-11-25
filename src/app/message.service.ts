import { Injectable } from '@angular/core';
/*  To make sure that the HeroService can provide this service, register it with the injector,
which is the object that is responsible for choosing and injecting the provider where the app requires it.*/
@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: string[] = [];

  add(message: string){
    this.messages.push(message);
  }

  clear(){
    this.messages = [];
  }
}
