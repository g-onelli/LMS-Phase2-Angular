import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PatronSignupDto } from '../../model/user.model';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit,OnDestroy {

  signUpForm: FormGroup;
  patronDto: PatronSignupDto;
  subscriptions: Subscription[]=[];
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      name: new FormControl('',[Validators.pattern(/^[a-zA-Z ]+$/)]),
      username: new FormControl('', [Validators.pattern(/^[a-zA-Z0-9]+$/)]),
      password: new FormControl('', [Validators.pattern(/^[a-zA-Z0-9]+$/)]),
      securityQuestion: new FormControl(''),
      securityAnswer: new FormControl('')
    });
  }
  onFormSubmit(){
    this.patronDto={
      name: this.signUpForm.value.name,
      securityQuestion: this.signUpForm.value.securityQuestion,
      securityAnswer: this.signUpForm.value.securityAnswer,
      encodedCredentials: btoa(this.signUpForm.value.username + '@%' + this.signUpForm.value.password)
    };
    this.subscriptions.push(
    this.authService.signUp(this.patronDto).subscribe({
      next: (data)=> {
        this.authService.message$.next('Sign Up Successful: Please Login');
        this.router.navigateByUrl('/login');
      },
      error: (e)=>{

      }
    })
    );
   }
   ngOnDestroy(): void {
    this.subscriptions.forEach(sub=>sub.unsubscribe());
  }
}
