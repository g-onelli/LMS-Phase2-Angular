import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/auth/model/user.model';
import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit,OnDestroy  {
  message:string;
  loginForm: FormGroup;
  username: string;
  password:string;
  user: User;
  subscriptions: Subscription[]=[];
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required)
    });
    this.subscriptions.push(
    this.authService.message$.subscribe(data=>{
      this.message = data;
    })
    );
  }
  onFormSubmit(){
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;
    this.subscriptions.push(
    this.authService.login(this.username,this.password).subscribe({
      next: (data)=>{
        this.user = data;
        localStorage.setItem('username',this.user.username);
        localStorage.setItem('credentials', btoa(this.user.username + ':' + this.password));
        localStorage.setItem('role', this.user.role);
        this.authService.username$.next(this.user.username);
        if(this.user.role == "LIBRARIAN"){
          localStorage.clear();
          this.authService.username$.next('');
          this.authService.isLoggedIn();
          this.authService.message$.next('Please Login to the Librarian Portal');
          this.router.navigateByUrl('/liblogin');
        }
        if(this.user.role == "PATRON")
          this.router.navigateByUrl('/patdashboard');
      },
      error : (e)=>{
        this.authService.message$.next('Invalid credentials');
      }
    })
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub=>sub.unsubscribe());
  }
}
