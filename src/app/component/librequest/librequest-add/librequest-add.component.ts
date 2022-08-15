import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CompleteRequest } from 'src/app/model/request.model';
import { RequestService } from 'src/app/service/request.service';

@Component({
  selector: 'app-librequest-add',
  templateUrl: './librequest-add.component.html',
  styleUrls: ['./librequest-add.component.less']
})
export class LibrequestAddComponent implements OnInit,OnDestroy {

  completeRequest: CompleteRequest;
  requestForm :FormGroup;
  request: Request;
  msg: string;
  subscriptions: Subscription[]=[];
  @Output()
  putRequestEmitter = new EventEmitter();

  constructor(private requestService: RequestService, private router: Router) { }

  ngOnInit(): void {
    this.requestForm = new FormGroup({
      id: new FormControl('', [Validators.required,Validators.pattern(/^[0-9 ]+$/)]),
      publisher: new FormControl('', [Validators.required,Validators.pattern(/^[\w\-\s]+$/)]),
      genre: new FormControl('', [Validators.required]),
    });
  }
onFormSubmit(){
      this.completeRequest={
        publisher: this.requestForm.value.publisher,
        genre: this.requestForm.value.genre
      };
      this.subscriptions.push(
      this.requestService.completeBookRequest(this.completeRequest, this.requestForm.value.id).subscribe({
        next: (data)=>{
          this.msg='Book Added';
          this.putRequestEmitter.emit(this.completeRequest);
          this.requestForm.reset();
        },
        error: (e)=>{
          this.msg='Operation failed';
        }
      })
      );
}
ngOnDestroy(): void {
  this.subscriptions.forEach(sub=>sub.unsubscribe());
}
}
