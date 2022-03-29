import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
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
  selector: 'app-my-component',
  template: `<span #${containerElementName}></span>`,
  // styleUrls: [''],
  encapsulation: ViewEncapsulation.None,
})
export class CustomReactComponentWrapperComponent implements OnChanges, OnDestroy, AfterViewInit {
  @ViewChild(containerElementName, { static: true }) containerRef!: ElementRef;

  @Input() public counter!: number;
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
