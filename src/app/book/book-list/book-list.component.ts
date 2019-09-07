import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { NotifierService } from 'angular-notifier';

import { BookFormComponent } from '../book-form/book-form.component';

import { BookService } from 'src/app/shared/services/book.service';
import { take } from 'rxjs/operators';

import * as moment from 'moment';
import 'moment/min/locales';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  books: any;

  bsModalRef: BsModalRef;
  private readonly notifier: NotifierService;

  constructor(
    private modalService: BsModalService,
    private bookService: BookService,
    notifierService: NotifierService
  ) {
    this.notifier = notifierService;
  }

  openModalFormBook(action: string, book: any = null) {
    const initialState = {
      title: `${action} Livro`,
      book
    };

    this.bsModalRef = this.modalService.show(BookFormComponent, {
      initialState,
      class: 'modal-lg'
    });

    this.bsModalRef.content.closeBtnName = 'Cancelar';

    this.modalService.onHide.pipe(take(1)).subscribe(() => {
      this.get();
    });
  }

  ngOnInit() {
    this.get();
  }

  get() {
    this.bookService.get('').subscribe((response) => (this.books = response));
  }

  edit(book: any) {
    this.openModalFormBook('Editar', book);
  }

  delete(book: any) {
    const { id, title } = book;

    this.bookService.delete(id).subscribe(
      (response: any) => {
        this.get();

        const message = `Livro "${title}" removido com sucesso!`;

        this.notifier.notify('success', message);
      },
      (error: any) => console.log(error.message)
    );
  }

  getDateFormat(date: any) {
    moment.locale('pt-br');
    return moment(date).format('LL');
  }
}
