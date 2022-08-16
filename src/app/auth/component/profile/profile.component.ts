import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProfilePatron } from 'src/app/model/patron.model';
import { PatronService } from 'src/app/service/patron.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit,OnDestroy {
  patronDto: ProfilePatron;
  credentials: string;
  username: string;
  profileForm: FormGroup;
  msg:string;
  subscriptions: Subscription[]=[];
  constructor(private authService: AuthService, private router: Router, private patronService: PatronService) { }

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    this.profileForm = new FormGroup({
      name: new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Z ]+$/)]),
      username: new FormControl({value:this.username, disabled: true}),
      cardexpirationdate: new FormControl({value: '', disabled: true},),
      uid: new FormControl({value: '', disabled: true},),
      securityQuestion: new FormControl('', [Validators.required,Validators.pattern(/^[-@.?,\/#&+\w\s]*$/)]),
      securityAnswer: new FormControl('', [Validators.required,Validators.pattern(/^[-@.?,\/#&+\w\s]*$/)])
    });
    this.credentials = localStorage.getItem('credentials');
    this.subscriptions.push(
      this.authService.getUserByUsername(this.credentials).subscribe({
        next: (data)=>{ 
        this.patronDto = data;
        this.profileForm.controls['name'].setValue(this.patronDto.name);
        this.profileForm.controls['username'].setValue(this.patronDto.username);
        this.profileForm.controls['cardexpirationdate'].setValue(this.patronDto.cardexpirationdate);
        this.profileForm.controls['uid'].setValue(this.patronDto.uid);
        this.profileForm.controls['securityQuestion'].setValue(this.patronDto.securityQuestion);
        this.profileForm.controls['securityAnswer'].setValue(this.patronDto.securityAnswer);
        },
        error: (e)=>{  }
      })
    );
  }
  onFormSubmit(){
    this.subscriptions.push(
    this.patronService.getIdByCredentials().subscribe({
      next: (data)=>{
    this.patronDto={
      name: this.profileForm.value.name,
      securityQuestion: this.profileForm.value.securityQuestion,
      securityAnswer:this.profileForm.value.securityAnswer,
      username: this.username,
      id: data.id
    };
    this.subscriptions.push(
    this.authService.editProfile(this.patronDto).subscribe({
      next: (data)=>{
        this.msg='Profile Updated';
        this.profileForm.controls['name'].setValue(this.patronDto.name);
        this.profileForm.controls['securityQuestion'].setValue(this.patronDto.securityQuestion);
        this.profileForm.controls['securityAnswer'].setValue(this.patronDto.securityAnswer);
      },
      error:(e)=>{
        this.msg='Update Operation Failed';
      }
    })
    );
  },
  error: (e)=>{  }
  })
    );
   }
   ngOnDestroy(): void {
    this.subscriptions.forEach(sub=>sub.unsubscribe());
  }
}
