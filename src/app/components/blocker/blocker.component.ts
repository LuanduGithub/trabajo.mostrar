import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LoginPage } from './../../login/login.page';

@Component({
  selector: 'app-blocker',
  templateUrl: './blocker.component.html',
  styleUrls: ['./blocker.component.scss'],
})

export class BlockerComponent implements OnInit {
  @Input() blocker: any;
  @Output() parentEvent = new EventEmitter<any>();

  viewBlocker = true;
  constructor() { }

  ngOnInit() {

  }
  parentFn() {
    this.parentEvent.next();
    this.viewBlocker = false;
  }

}
