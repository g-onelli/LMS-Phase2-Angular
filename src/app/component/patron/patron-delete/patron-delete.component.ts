import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Patron } from 'src/app/model/patron.model';
import { PatronService } from 'src/app/service/patron.service';

@Component({
  selector: 'app-patron-delete',
  templateUrl: './patron-delete.component.html',
  styleUrls: ['./patron-delete.component.less']
})
export class PatronDeleteComponent implements OnInit,OnDestroy {

  patronForm :FormGroup;
  patron: Patron;
  msg: string;
  id: number;
  subscriptions: Subscription[]=[];

  @Output()
  deletePatronEmitter = new EventEmitter();

  constructor(private patronService: PatronService) { }

  ngOnInit(): void {
    this.patronForm = new FormGroup({
      id: new FormControl('', [Validators.required,Validators.pattern(/^[0-9 ]+$/)])
    });
    this.msg='';
  }
onFormSubmit(){
  this.id = this.patronForm.value.id;
  this.subscriptions.push(
  this.patronService.deletePatron(this.id).subscribe({
    next: (data)=>{

      this.msg='Patron deleted in the system';
      this.deletePatronEmitter.emit(this.id);
      this.patronForm.reset();
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
