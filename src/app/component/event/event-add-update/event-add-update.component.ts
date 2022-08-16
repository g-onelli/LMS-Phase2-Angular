import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventModel } from 'src/app/model/event.model';
import { EventService } from 'src/app/service/event.service';
import { LibrarianService } from 'src/app/service/librarian.service';

@Component({
  selector: 'app-event-add-update',
  templateUrl: './event-add-update.component.html',
  styleUrls: ['./event-add-update.component.less']
})
export class EventAddUpdateComponent implements OnInit {

  msg:string;
  event: EventModel;
  eventForm: FormGroup;
  updateClicked: boolean;

  constructor(private eventService : EventService, private librarianService: LibrarianService) { }

  ngOnInit(): void {
    this.msg = '';
    this.updateClicked = false;
    this.eventForm = new FormGroup ({
      id: new FormControl('', [Validators.pattern(/^[0-9]+$/)]),
      title: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]),
      description: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]),
      date: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)])
    });
  }

  onFormButton() {
    if(this.updateClicked == false) {
      this.onFormSubmit();
    } else {
      this.onFormUpdate();
    }
  }

  onAddClick(){
    this.updateClicked = false;
  }

  onUpdateClick() {
   this.updateClicked = true;
  }

  onFormSubmit() {
    this.event = this.eventForm.value;
    
    this.librarianService.getIdByCredentials().subscribe({
      next: (data) => {
        let id = data.id;
        this.eventService.postEvent(this.event, id).subscribe({
          next: (data) => {
            this.event = data;
            this.msg = 'Added Event to System';
            //if the array has space, add the new event to the display array
            if(this.eventService.event$.getValue().length < 3) {
              let eventArray = this.eventService.event$.getValue();
              eventArray.push(this.event);
              this.eventService.event$.next(eventArray);
            }
          },
          error: (e) => {

          }
        })
      },
      error: (e)=>{

      }
    })

  }

  onFormUpdate() {
    let eventArray = this.eventService.event$.getValue();
    this.event = this.eventForm.value;
    let index = eventArray.findIndex(obj => obj.id == this.event.id);
    this.eventService.updateByIdEvent(this.event.id, this.event).subscribe({
      next: (data) => {
        
        eventArray[index] = this.event;
        this.eventService.event$.next(eventArray);
        this.msg = 'Attempted to Update Event: ' + this.event.id;
      },
      error: (e) => {
        this.msg = e;
      }
    })
  }
}
