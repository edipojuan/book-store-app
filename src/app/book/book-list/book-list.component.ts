import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { BookFormComponent } from '../book-form/book-form.component';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  books = [
    { title: 'test 1' },
    { title: 'test 2' },
    { title: 'test 3' },
    { title: 'test 3' },
    { title: 'test 3' },
    { title: 'test 3' },
    { title: 'test 4' }
  ];

  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) {}

  openModalWithComponent(action: string) {
    const initialState = {
      list: [
        'Open a modal with component',
        'Pass your data',
        'Do something else',
        '...'
      ],
      title: `${action} Livro`
    };

    this.bsModalRef = this.modalService.show(BookFormComponent, {
      initialState,
      class: 'modal-lg'
    });
    this.bsModalRef.content.closeBtnName = 'Cancelar';
  }

  ngOnInit() {}
}
