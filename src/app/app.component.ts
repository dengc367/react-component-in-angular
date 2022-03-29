import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-angular-app';
  public counter:number=3;

  public handleOnClick(stateCounter: number) {
    console.log("--------"+stateCounter)
    this.counter+=stateCounter;
  }
}
