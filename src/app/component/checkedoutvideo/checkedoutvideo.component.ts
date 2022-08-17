import { PatronService } from 'src/app/service/patron.service';
import { CheckedoutvideoService } from './../../service/checkedoutvideo.service';
import { CheckedOutVideo } from './../../model/checkedoutvideo.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-checkedoutvideo',
  templateUrl: './checkedoutvideo.component.html',
  styleUrls: ['./checkedoutvideo.component.css']
})
export class CheckedoutvideoComponent implements OnInit {


  @Output() deleteCheckedOutVideoEmitter = new EventEmitter();
  @Output() postCheckedOutVideoEmitter = new EventEmitter();

  checkedOutVideos: CheckedOutVideo[];

  errorMessage: string;
  pId: number;

  constructor(private checkedOutVideoService: CheckedoutvideoService, private patronService : PatronService) { }

  ngOnInit(): void {
    this.errorMessage = '';

    this.patronService.getIdByCredentials().subscribe({
      next: (data) => {
        this.pId  = data.id;
        
        this.checkedOutVideoService.fetchCheckedOutVideosById(this.pId).subscribe({
          next: (data2) =>{
            this.checkedOutVideos = data2;
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

  displayCheckedOutVideos(){
    
  }

  onCheckedInVideosPut(){
    this.checkedOutVideoService.fetchCheckedOutVideosById(this.pId).subscribe({
      next: (data) => {
        this.checkedOutVideos = data;
      },
      error: (e) =>{

      }
    })
  }

  onCheckedOutVideosPut(){
    this.checkedOutVideoService.fetchCheckedOutVideosById(this.pId).subscribe({
      next: (data) => {
        this.checkedOutVideos = data;
      },
      error: (e) =>{

      }
    })
  }



  checkOutVideo(pId: number, vId: number) {
    this.checkedOutVideoService.postCheckedOutVideos(pId, vId).subscribe({
      next: (data) => {
        this.checkedOutVideos = data
        this.postCheckedOutVideoEmitter.emit(vId);
      },
      error: (e) => {
        this.errorMessage = "ID does not exist in available books list";
      }
    })
  }

  checkInVideo(id: number) {
    this.checkedOutVideoService.deleteCheckedOutVideo(id).subscribe({
      next: (data) => {
        this.checkedOutVideos = data;
        this.deleteCheckedOutVideoEmitter.emit(id);
      },
      error: (e) => {
        this.errorMessage = "ID does not exist in list of checked out videos!!!";
      }
    });
  }

}
