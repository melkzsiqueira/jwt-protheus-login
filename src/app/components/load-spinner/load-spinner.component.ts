import { Component, OnInit } from '@angular/core';
import { LoadSpinnerService } from 'src/app/services/load-spinner/load-spinner.service';
import LoadSpinner from '../../models/loadSpinner';

@Component({
  selector: 'app-load-spinner',
  templateUrl: './load-spinner.component.html',
  styleUrls: ['./load-spinner.component.css'],
})
export class LoadSpinnerComponent implements OnInit {
  isActive: LoadSpinner = { message: 'Carregando...', load: false };

  constructor(private loadSpinnerService: LoadSpinnerService) {}

  ngOnInit(): void {
    this.loadSpinnerService.isActive.subscribe((isActive) => {
      this.isActive = isActive;
    });
  }
}
