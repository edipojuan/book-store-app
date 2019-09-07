import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask
} from '@angular/fire/storage';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;

  title: string;
  closeBtnName: string;
  list: any[] = [];

  constructor(
    private afStorage: AngularFireStorage,
    public bsModalRef: BsModalRef
  ) {}

  ngOnInit() {
    this.list.push('PROFIT!!!');
  }

  upload(event) {
    const id = Math.random()
      .toString(36)
      .substring(2);
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(event.target.files[0]);
  }
}
