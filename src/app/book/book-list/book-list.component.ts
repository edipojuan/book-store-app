import { Component, OnInit } from '@angular/core';

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

  constructor() {}

  ngOnInit() {}
}
