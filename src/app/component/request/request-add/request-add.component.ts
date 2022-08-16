import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Requests } from 'src/app/model/request.model';
import { PatronService } from 'src/app/service/patron.service';
import { RequestService } from 'src/app/service/request.service';

@Component({
  selector: 'app-request-add',
  templateUrl: './request-add.component.html',
  styleUrls: ['./request-add.component.less']
})
export class RequestAddComponent implements OnInit,OnDestroy {
  requestDto: Requests;
  requestForm :FormGroup;
  request: Request;
  msg: string;
  pid: number;
  subscriptions: Subscription[]=[];
  constructor(private requestService: RequestService, private router: Router, private patronService: PatronService) { }

  ngOnInit(): void {
    this.requestForm = new FormGroup({
      title: new FormControl('', [Validators.required,Validators.pattern(/^[\w\-\s]+$/)]),
      author: new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Z ]+$/)]),
      description: new FormControl('', [Validators.required]),
    });
  }
onFormSubmit(){
  this.subscriptions.push(
  this.patronService.getIdByCredentials().subscribe({
    next: (data)=>{
      this.pid = data.id;
      this.requestDto={
        title: this.requestForm.value.title,
        author: this.requestForm.value.author,
        description: this.requestForm.value.description
      };
      this.subscriptions.push(
      this.requestService.postRequest(this.requestDto, this.pid).subscribe({
        next: (data)=>{
          this.msg='Request Submitted';
          this.requestForm.reset();
        },
        error: (e)=>{
          this.msg='Operation failed';
        }
      })
      );
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
