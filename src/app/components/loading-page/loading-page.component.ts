import { Component, Input, OnInit } from '@angular/core';

import Load from '../../models/loading';

@Component({
  selector: 'app-loading-page',
  templateUrl: './loading-page.component.html',
  styleUrls: ['./loading-page.component.css']
})

export class LoadingPageComponent implements OnInit {

  @Input()
  loading: Load = { message: '', load: false };

  constructor() { }

  ngOnInit(): void {
  }

}
