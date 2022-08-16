import { AvailablebooksComponent } from './../availablebooks/availablebooks.component';
import { PatronService } from 'src/app/service/patron.service';
import { CheckedoutbookService } from './../../service/checkedoutbook.service';
import { CheckedOutBook } from './../../model/checkedoutbook.model';
import { Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-checkedoutbook',
  templateUrl: './checkedoutbook.component.html',
  styleUrls: ['./checkedoutbook.component.css']
})
export class CheckedoutbookComponent implements OnInit {

  @Output() deleteCheckedOutBookEmitter = new EventEmitter();
  @Output() postCheckedOutBookEmitter = new EventEmitter();


  checkedOutBooks: CheckedOutBook[];
  errorMessage: string;
  pId : number;
  constructor(private checkedOutBookService: CheckedoutbookService, private patronService : PatronService) {
  }

  ngOnInit(): void {
    this.errorMessage = '';

    this.patronService.getIdByCredentials().subscribe({
      next: (data) => {
        this.pId  = data.id;
        
        this.checkedOutBookService.fetchCheckedOutBooksById(this.pId).subscribe({
          next: (data2) =>{
            this.checkedOutBooks = data2;
          },
          error: (e) =>{
            //redirect to error page
          }
        })
      },
        error: (e) =>{
          //redirect to error page
        }
      
    })
  }

  onCheckedInBookPut(){
    this.checkedOutBookService.fetchCheckedOutBooksById(this.pId).subscribe({
      next: (data) => {
        this.checkedOutBooks = data;
      },
      error: (e) =>{

      }
    })
  }

  onCheckedOutBookPut(){
    this.checkedOutBookService.fetchCheckedOutBooksById(this.pId).subscribe({
      next: (data) => {
        this.checkedOutBooks = data;
      },
      error: (e) =>{

      }
    })
  }

  

  checkOutBook(pId: number, bId: number) {
    this.checkedOutBookService.postCheckedOutBook(pId, bId).subscribe({
      next: (data) => {
        this.checkedOutBooks = data;
        this.postCheckedOutBookEmitter.emit(bId);
      },
      error: (e) => {
        this.errorMessage = "throw"
      }
    })
  }

  checkInBook(id: number) {
    this.checkedOutBookService.deleteCheckedOutBook(id).subscribe({
      next: (data) => {
        this.checkedOutBooks = data;
        this.deleteCheckedOutBookEmitter.emit(id);
      },
      error: (e) => {
        this.errorMessage = "throw"
      }
    });
  }

}
