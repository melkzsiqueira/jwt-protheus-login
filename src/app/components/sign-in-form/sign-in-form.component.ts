import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { fromEvent, merge, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../services/authentication/authentication.service';
import { GenericValidator } from '../../validations/generic-form.validations';
import { LoadSpinnerService } from '../../services/load-spinner/load-spinner.service';
import { NotificationService } from '../../services/notification/notification.service';

import ValidationMessages from '../../models/validationMessages';
import DisplayMessage from '../../models/displayMessage';
import SignIn from '../../models/signIn';

import * as bulmaToast from 'bulma-toast'

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.css']
})
export class SignInFormComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formImputElements: ElementRef[];

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

  returnUrl: string = '';

  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};

  constructor(
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService,
    private loadSpinnerService: LoadSpinnerService,
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

  signIn(): void{
    if (this.signInForm.dirty && this.signInForm.valid) {
      this.loadSpinnerService.active({ message: 'Entrando...' , load: true });

      this.signInData = Object.assign(
        {},
        this.signInData,
        this.signInForm.value
        );

      this.authenticationService.postToken(this.signInData)
          .pipe(first())
          .subscribe(
              data => {
                this.loadSpinnerService.active({ load: false });
                this.router.navigate([this.returnUrl]);
              },
              error => {
                this.loadSpinnerService.active({ message: 'Entrando...' , load: false });

                bulmaToast.toast({ 
                  message: error,
                  type: 'is-danger',
                  dismissible: false,
                  duration: 3000,
                  position: "bottom-center",
                  closeOnClick: true,
                 });
              });
    }
  }

}
