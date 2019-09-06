import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { DropzoneDirective } from './dropzone.directive';
import { UploaderComponent } from './uploader/uploader.component';
import { UploadTaskComponent } from './upload-task/upload-task.component';

// const firebaseConfig = {
//   apiKey: 'AIzaSyAEI8TJ9scxd8zTImvOjowDgb4UMSd6Ca4',
//   authDomain: 'upload-img-afebb.firebaseapp.com',
//   databaseURL: 'https://upload-img-afebb.firebaseio.com',
//   projectId: 'upload-img-afebb',
//   storageBucket: 'upload-img-afebb.appspot.com',
//   messagingSenderId: '219798758355',
//   appId: '1:219798758355:web:9bd97faa407c8521d00526'
// };

@NgModule({
  declarations: [
    AppComponent,
    DropzoneDirective,
    UploaderComponent,
    UploadTaskComponent
  ],
  imports: [
    BrowserModule,
    // AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AppRoutingModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyBMnQa9W_4aKrlSQ4kIlm_JQkAfNJJUZPM',
      authDomain: 'book-store-d9ae0.firebaseapp.com',
      storageBucket: 'book-store-d9ae0.appspot.com',
      projectId: 'book-store-d9ae0'
    }),
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
