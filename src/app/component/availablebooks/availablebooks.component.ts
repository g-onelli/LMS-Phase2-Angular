import { AvailableBooksService } from './../../service/availablebooks.service';
import { Book } from 'src/app/model/book.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-availablebooks',
  templateUrl: './availablebooks.component.html',
  styleUrls: ['./availablebooks.component.css']
})
export class AvailablebooksComponent implements OnInit {


  availableBooks:Book[];
  errorMessage:string;

  constructor(private availableBooksService : AvailableBooksService) { }

  ngOnInit(): void {
    this.displayAvailableBooks();
  }

  displayAvailableBooks(){
    this.errorMessage='';
    this.availableBooksService.fetchAvailableBooks().subscribe({
      next: (data) => {
        this.availableBooks = data;


      },
      error: (e) => {
        this.errorMessage = 'Books could not be fetched..'
      }
    });
  }


}
