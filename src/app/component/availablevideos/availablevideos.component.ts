import { AvailableVideosService } from 'src/app/service/availablevideos.service';
import { Component, OnInit } from '@angular/core';
import { Video } from 'src/app/model/video.model';

@Component({
  selector: 'app-availablevideos',
  templateUrl: './availablevideos.component.html',
  styleUrls: ['./availablevideos.component.css']
})
export class AvailablevideosComponent implements OnInit {

  availableVideos:Video[];
  errorMessage:string;


  constructor(private availableVideosService : AvailableVideosService) { }

  ngOnInit(): void {
    this.displayAvailableVideos();
  }

  
  displayAvailableVideos(){
    this.errorMessage='';
    this.availableVideosService.fetchAvailableVideos().subscribe({
      next: (data) => {
        this.availableVideos = data;
      },
      error: (e) => {
        this.errorMessage = 'Videos could not be fetched..'
      }
    });
  }

  onCheckedOutPut(){

  }

  onCheckedInPut(){
    
  }

}
