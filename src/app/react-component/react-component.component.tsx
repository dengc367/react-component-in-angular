import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { CustomReactComponent } from './CustomReactComponent';
const containerElementName = 'customReactComponentContainer';

@Component({
  selector: 'app-react-component',
  templateUrl: './react-component.component.html',
  // template: `<span #${containerElementName}></span>`,
  styleUrls: ['./react-component.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ReactComponentComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @ViewChild(containerElementName, { static: true }) containerRef!: ElementRef;

  @Input() public counter: number=1;
  @Output('componentClick') public componentClick: EventEmitter<number> = new EventEmitter<number>();

  constructor() {
    this.handleDivClicked = this.handleDivClicked.bind(this);
}
public handleDivClicked() {
  console.log("22-----------", this.componentClick)
    if (this.componentClick) { 
      console.log("33-----------", this.componentClick)
        this.componentClick.emit(this.counter);
        this.render();
    }
    
}

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.render();
}

ngAfterViewInit() {
    this.render();
}

ngOnDestroy() {
    ReactDOM.unmountComponentAtNode(this.containerRef.nativeElement);
}

private render() {
    const { counter } = this;

    ReactDOM.render(
        <React.StrictMode>
            <div>
                <CustomReactComponent counter={counter} onClick={this.handleDivClicked} />
            </div>
        </React.StrictMode>
        , this.containerRef.nativeElement);
}

}
