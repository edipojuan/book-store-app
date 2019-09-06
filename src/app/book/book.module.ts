import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookListComponent } from './book-list/book-list.component';
import { BookFormComponent } from './book-form/book-form.component';

@NgModule({
  declarations: [BookListComponent, BookFormComponent],
  imports: [
    CommonModule
  ]
})
export class BookModule { }
