import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from "moment";

import Api from '../api';
import Token from '../../models/token';
import Login from '../../models/signIn';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<Token>;
  public currentUser: Observable<Token>;

  constructor(
    private httpClient: HttpClient
  ) {
    this.currentUserSubject = new BehaviorSubject<Token>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Token {
    return this.currentUserSubject.value;
  }

  public get isSignIn(): boolean {
    return moment().isBefore(moment.unix(this.currentUserValue.expires_in));
  }

  ngOnInit(): void {
  }

  // Requisição do Token no Protheus
  postToken({ username, password }: Login): Observable<Token> {
    const queryParams = '?grant_type=password&password='+username+'&username='+password;

    return this.httpClient.post<Token>(
        Api.baseURL + `/api/oauth2/v1/token` + queryParams,
        { username, password }
      ).pipe(map(token => {
          token.expires_in = moment().add(token.expires_in, 'seconds').unix();

          localStorage.setItem('currentUser', JSON.stringify(token));
          this.currentUserSubject.next(token);

          return token;
        }));
  }

  deleteToken(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next({} as Token);
  }
}
