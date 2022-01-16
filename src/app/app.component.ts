import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Pusher from 'pusher-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  username:string = 'username';
  message:any = '';
  messages:any = [];

  constructor( private http:HttpClient ) {

  }
  
  ngOnInit() {
     // Enable pusher logging - don't include this in production
     Pusher.logToConsole = true;

     const pusher = new Pusher('b1a4432e58903dd6bed4', {
       cluster: 'eu'
     });
 
     const channel = pusher.subscribe('chat');
     channel.bind('message', data => {
       this.messages.push(data);
     });
  }
  
  submit():void {
    this.http.post('http://localhost:8000/api/messages', {
      username: this.username,
      message: this.message,
    }).subscribe(() => {
      this.message = '';
    });
  }

}
