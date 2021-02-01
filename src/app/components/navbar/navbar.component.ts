import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication/authentication.service';

import Load from '../../models/loading';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Output()
  loading: EventEmitter<Load> = new EventEmitter();

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.loading.emit({ message: 'Saindo...', load: true });

    setTimeout(() => {
      this.authenticationService.deleteToken();
      this.router.navigate(['/sign-in']);
      this.loading.emit({ message: 'Saindo...', load: false });
    }, 1000);
  }

}
