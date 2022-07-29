import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookComponent } from './component/book/book.component';
import { VideoComponent } from './component/video/video.component';
import { CheckedoutbookComponent } from './component/checkedoutbook/checkedoutbook.component';
import { CheckedoutvideoComponent } from './component/checkedoutvideo/checkedoutvideo.component';
import { RoomComponent } from './component/room/room.component';
import { PatronComponent } from './component/patron/patron.component';
import { LibrarianComponent } from './component/librarian/librarian.component';
import { EventComponent } from './component/event/event.component';
import { FeeComponent } from './component/fee/fee.component';
import { RequestComponent } from './component/request/request.component';

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    VideoComponent,
    CheckedoutbookComponent,
    CheckedoutvideoComponent,
    RoomComponent,
    PatronComponent,
    LibrarianComponent,
    EventComponent,
    FeeComponent,
    RequestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }