import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../services/authentication/authentication.service';
import { GenericValidator } from '../../validations/generic-form.validations';

import ValidationMessages from '../../models/validationMessages';
import DisplayMessage from '../../models/displayMessage';
import SignIn from '../../models/signIn';
import Load from '../../models/loading';

import { fromEvent, merge, Observable } from 'rxjs';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.css']
})
export class SignInFormComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formImputElements: ElementRef[];

  @Output()
  loading: EventEmitter<Load> = new EventEmitter();

  signInForm: FormGroup = this.formBuilder.group({
    username: [
      '',
      [
        Validators.required,
        Validators.minLength(5)
      ]
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(5)
      ]
    ]
  });

  signInData: SignIn = {
    username: '',
    password: ''
  };

  error: string = '';
  returnUrl: string = '';

  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { 
    this.validationMessages = {
      username: {
        required: 'O campo Usuário é obrigatório!',
        minlength: 'O Usuário precisa ter no mínimo 5 caracteres!'
      },
      password: {
        required: 'O campo Senha é obrigatório!',
        minlength: 'A Senha precisa ter no mínimo 5 caracteres!'
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);

    this.formImputElements = [];
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formImputElements
    .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processarMensagens(this.signInForm);
    });
  }

  signIn() {
    if (this.signInForm.dirty && this.signInForm.valid) {
      this.loading.emit({ message: 'Entrando...', load: true });

      this.signInData = Object.assign(
        {},
        this.signInData,
        this.signInForm.value
        );

      this.authenticationService.postToken(this.signInData)
          .pipe(first())
          .subscribe(
              data => {
                this.router.navigate([this.returnUrl]);
              },
              error => {
                this.error = error;
                this.loading.emit({ message: 'Entrando...', load: false });
              });
    }
  }

}
