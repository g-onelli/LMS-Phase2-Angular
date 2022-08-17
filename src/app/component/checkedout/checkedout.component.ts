import { AvailablevideosComponent } from './../availablevideos/availablevideos.component';
import { AvailablebooksComponent } from './../availablebooks/availablebooks.component';
import { PatronService } from 'src/app/service/patron.service';
import { CheckedoutvideoComponent } from './../checkedoutvideo/checkedoutvideo.component';
import { CheckedoutbookComponent } from './../checkedoutbook/checkedoutbook.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-checkedout',
  templateUrl: './checkedout.component.html',
  styleUrls: ['./checkedout.component.less']
})


export class CheckedoutComponent implements OnInit {

  checkOutForm: FormGroup;
  checkInForm: FormGroup;
  checkinMessage: string;
  checkoutMessage : string;
  pId: number;
  flag : boolean;


  @ViewChild(CheckedoutbookComponent) checkedOutBookComponent: CheckedoutbookComponent;
  @ViewChild(CheckedoutvideoComponent) checkedOutVideoComponent: CheckedoutvideoComponent;
  @ViewChild(AvailablebooksComponent) availableBooksComponent: AvailablebooksComponent;
  @ViewChild(AvailablevideosComponent) availableVideosComponent: AvailablevideosComponent;

  constructor(private patronService : PatronService) { }

  ngOnInit(): void {
    this.checkinMessage = '';
    this.checkoutMessage = '';

    
  
    this.checkOutForm = new FormGroup({
      itemId: new FormControl('', [Validators.required, Validators.pattern(/^([0-9]+)$/)]),
      iType: new FormControl('book')
    });

    this.checkInForm = new FormGroup({
      itemId: new FormControl('', [Validators.required, Validators.pattern(/^([0-9]+)$/)]),
      iType: new FormControl('book')
    });

  }

  checkAvailableBooks(){
    this.flag = false;
    for(var i = 0; i < this.availableBooksComponent.availableBooks.length; i++){
      console.log(this.flag)
      if(this.checkOutForm.value.itemId == this.availableBooksComponent.availableBooks[i].id){
        this.flag = true;
        break;
      }
    }
  }
  checkAvailableVideos() {
    this.flag = false;
    for(var i = 0; i < this.availableVideosComponent.availableVideos.length; i++){
      console.log(this.flag)
      if(this.checkOutForm.value.itemId == this.availableVideosComponent.availableVideos[i].id){
        this.flag = true;
        break;
      }
    }
  }
  checkOutFormSubmit() {
    if (this.checkOutForm.value.iType === "book") {
      
      this.checkAvailableBooks();
      if(this.flag == true){

        this.patronService.getIdByCredentials().subscribe({
          next: (data)=>{
            this.pId = data.id;
            this.checkOutBook(this.pId, parseInt(this.checkOutForm.value.itemId));
          }
        })
        
      }
      else{
        this.checkoutMessage = "ID is not listed in available books!"
      }
    }
    else {

      this.checkAvailableVideos();
      if(this.flag == true){
        this.patronService.getIdByCredentials().subscribe({
          next: (data)=>{
            this.pId = data.id;
            this.checkOutVideo(this.pId, parseInt(this.checkOutForm.value.itemId));
          }
        })
      }
      else{
        this.checkoutMessage = "ID is not listed in available videos!"
      }
    }
  }
  checkInFormSubmit() {

    if (this.checkInForm.value.iType === "book") {

          this.checkInBook(parseInt(this.checkInForm.value.itemId));
    }
    
    else {
          this.checkInVideo(parseInt(this.checkInForm.value.itemId));

  }
  }
  checkOutBook(pId: number, bId: number) {

    this.checkedOutBookComponent.checkOutBook(pId, bId);

  }
  checkOutVideo(pId: number, vId: number) {

   this.checkedOutVideoComponent.checkOutVideo(pId, vId);
  }
  checkInBook(id: number) {
    this.checkinMessage = this.checkedOutBookComponent.errorMessage;
    this.checkedOutBookComponent.checkInBook(id);
   
  }
  checkInVideo(id: number) {
    this.checkinMessage = this.checkedOutVideoComponent.errorMessage;
    this.checkedOutVideoComponent.checkInVideo(id);
   
  }

  onCheckedInBookPut(){
    this.checkedOutBookComponent.onCheckedInBookPut();
    this.availableBooksComponent.displayAvailableBooks();
  }

  onCheckedOutBookPut(){
    this.checkedOutBookComponent.onCheckedOutBookPut();
    this.availableBooksComponent.displayAvailableBooks();
  }

  onCheckedInVideosPut(){
    this.checkedOutVideoComponent.onCheckedInVideosPut();
    this.availableVideosComponent.displayAvailableVideos();
  }

  onCheckedOutVideosPut(){
    this.checkedOutVideoComponent.onCheckedOutVideosPut();
    this.availableVideosComponent.displayAvailableVideos();
  }
}
