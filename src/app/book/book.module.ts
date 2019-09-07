import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookListComponent } from './book-list/book-list.component';
import { BookFormComponent } from './book-form/book-form.component';

import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [BookListComponent, BookFormComponent],
  imports: [CommonModule, ModalModule.forRoot()],
  entryComponents: [BookFormComponent]
})
export class BookModule {}
