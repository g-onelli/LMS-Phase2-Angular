import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserResetDto } from '../../model/user.model';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-username-verify',
  templateUrl: './username-verify.component.html',
  styleUrls: ['./username-verify.component.scss']
})
export class UsernameVerifyComponent implements OnInit,OnDestroy {

  username: string;
  error_msg: string;
  dto: UserResetDto;
  status: boolean;
  answer: string;
  showSecurityBox: boolean;
  subscriptions: Subscription[]=[];
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.error_msg='';
    this.status=true;
    this.showSecurityBox=false;
  }
  onSubmit(){
    // call the api and pass username
    this.subscriptions.push(
    this.authService.getUserSecurityDetailsByUsername(this.username).subscribe({
      next: (data)=>{
        this.dto = data;
        this.status = false;
        this.showSecurityBox=true;
      },
      error: (e)=>{
        this.error_msg='Username Invalid'
      }
    })
    );
  }
  onQuestionSubmit(){
    this.subscriptions.push(
    this.authService.validateSecurityAnswer(this.username, this.answer).subscribe({
      next: (data)=>{
        if(data === true){
          this.authService.user$.next(this.username);
          this.router.navigateByUrl('/password-reset-form');
        }
        else{
          this.authService.message$.next('Security Info could not be verified');
          this.router.navigateByUrl('/login');
        }
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