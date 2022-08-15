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
import { LibdashboardComponent } from './component/libdashboard/libdashboard.component';
import { PatdashboardComponent } from './component/patdashboard/patdashboard.component';
import { CheckedoutComponent } from './component/checkedout/checkedout.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LibrequestComponent } from './component/librequest/librequest.component';
import { LibbookComponent } from './component/libbook/libbook.component';
import { LibvideoComponent } from './component/libvideo/libvideo.component';
import { EventListComponent } from './component/event/event-list/event-list.component';
import { EventAddUpdateComponent } from './component/event/event-add-update/event-add-update.component';
import { LogoutComponent } from './auth/component/logout/logout/logout.component';
import { LoginComponent } from './auth/component/login/login/login.component';
import { PatronListComponent } from './component/patron/patron-list/patron-list.component';
import { PatronAddComponent } from './component/patron/patron-add/patron-add.component';
import { PatronDeleteComponent } from './component/patron/patron-delete/patron-delete.component';
import { SignUpComponent } from './auth/component/sign-up/sign-up.component';
import { UsernameVerifyComponent } from './auth/component/username-verify/username-verify.component';
import { PasswordResetComponent } from './auth/component/password-reset/password-reset.component';
import { RequestAddComponent } from './component/request/request-add/request-add.component';
import { LibrequestDeleteComponent } from './component/librequest/librequest-delete/librequest-delete.component';
import { LibrequestAddComponent } from './component/librequest/librequest-add/librequest-add.component';
import { LibrequestListComponent } from './component/librequest/librequest-list/librequest-list.component';
import { AvailablebooksComponent } from './component/availablebooks/availablebooks.component';
import { AvailablevideosComponent } from './component/availablevideos/availablevideos.component';
import { BookListComponent } from './component/book/book-list/book-list.component';
import { VideoListComponent } from './component/video/video-list/video-list.component';
import { LibrarianLoginComponent } from './auth/component/librarian-login/librarian-login.component';
import { LibfeeComponent } from './component/libfee/libfee.component';
import { LibroomComponent } from './component/libroom/libroom.component';
import { ProfileComponent } from './auth/component/profile/profile.component';
import { ProfileBoxComponent } from './auth/component/profile-box/profile-box.component';
import { ChartComponent } from './component/libdashboard/chart/chart.component';
import {ChartModule} from 'primeng/chart';
import {CardModule} from 'primeng/card';
import { AppConfigService } from './service/app-config.service';
import { CardComponent } from './component/libdashboard/card/card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SplitterModule} from 'primeng/splitter';


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
    RequestComponent,
    LibdashboardComponent,
    PatdashboardComponent,
    CheckedoutComponent,
    LoginComponent,
    LibrequestComponent,
    LibbookComponent,
    LibvideoComponent,
    EventListComponent,
    EventAddUpdateComponent,
    LogoutComponent,
    PatronListComponent,
    PatronAddComponent,
    PatronDeleteComponent,
    SignUpComponent,
    UsernameVerifyComponent,
    PasswordResetComponent,
    RequestAddComponent,
    LibrequestDeleteComponent,
    LibrequestAddComponent,
    LibrequestListComponent,
    AvailablebooksComponent,
    AvailablevideosComponent,
    BookListComponent,
    VideoListComponent,
    LibrarianLoginComponent,
    LibfeeComponent,
    LibroomComponent,
    ProfileComponent,
    ProfileBoxComponent,
    ChartComponent,
    CardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, 
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ChartModule,
    CardModule,
    SplitterModule
  ],
  providers: [AppConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
