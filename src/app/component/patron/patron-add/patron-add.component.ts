import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PatronEditDto } from 'src/app/auth/model/user.model';
import { Patron } from 'src/app/model/patron.model';
import { PatronService } from 'src/app/service/patron.service';

@Component({
  selector: 'app-patron-add',
  templateUrl: './patron-add.component.html',
  styleUrls: ['./patron-add.component.less']
})
export class PatronAddComponent implements OnInit,OnDestroy {
  patronEditDto: PatronEditDto;
  temp: PatronEditDto;
  patronForm :FormGroup;
  patron: Patron;
  msg: string;
  tempname: string;
  tempcard: string;
  tempbalance: number;
  subscriptions: Subscription[]=[];
  @Output()
  putPatronEmitter = new EventEmitter();

  constructor(private patronService: PatronService, private router: Router) { }

  ngOnInit(): void {
    this.patronForm = new FormGroup({
      id: new FormControl('', [Validators.required,Validators.pattern(/^[0-9 ]+$/)]),
      name: new FormControl('', [Validators.pattern(/^[a-zA-Z ]+$/)]),
      cardexpirationdate: new FormControl('', [Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]),
      balance: new FormControl('', [Validators.pattern(/\d+\.\d*|\.?\d+/)]),
      //username: new FormControl('', [Validators.pattern(/^[a-zA-Z0-9]+$/)]),
    });
  }
onFormSubmit(){
  this.subscriptions.push(
  this.patronService.getPatronById(this.patronForm.value.id).subscribe({
    next: (data)=>{ 
      this.temp = data;
      this.tempname = data.name;
      this.tempcard = data.cardexpirationdate;
      this.tempbalance = data.balance;
      if(Object.keys(this.patronForm.value.name).length == 0){
        this.patronForm.controls['name'].setValue(this.tempname);
      }
      if(Object.keys(this.patronForm.value.cardexpirationdate).length == 0){
        this.patronForm.controls['cardexpirationdate'].setValue(this.tempcard);
      }
      if(Object.keys(this.patronForm.value.balance).length == 0){
        this.patronForm.controls['balance'].setValue(this.tempbalance);
      }
      this.patronEditDto={
        id: this.patronForm.value.id,
        name: this.patronForm.value.name,
        cardexpirationdate: this.patronForm.value.cardexpirationdate,
        balance: this.patronForm.value.balance
      };
      this.subscriptions.push(
      this.patronService.putPatron(this.patronEditDto).subscribe({
        next: (data)=>{
          this.msg='Profile Updated';
          this.putPatronEmitter.emit(this.patronEditDto);
        },
        error: (e)=>{
          this.msg='Operation failed';
        }
      })
      );
    },
    error: (e)=>{ 
      this.msg='Invalid Id';
     }
  })
  );
}
ngOnDestroy(): void {
  this.subscriptions.forEach(sub=>sub.unsubscribe());
}
}
