import { Component, OnInit, Injector } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { BookService } from './../../shared/services/book.service';

import { AngularFireStorage } from '@angular/fire/storage';

import { BaseForm } from 'src/app/shared/base/base-form';
import { Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent extends BaseForm {
  title: string;
  closeBtnName: string;
  list: any[] = [];

  uploadPercent: Observable<number>;
  urlImage: Observable<string>;

  private readonly notifier: NotifierService;

  constructor(
    injector: Injector,
    private storage: AngularFireStorage,
    public bsModalRef: BsModalRef,
    private bookService: BookService,
    notifierService: NotifierService
  ) {
    super(injector);
    this.notifier = notifierService;
  }

  onInit() {
    this.form = this.formBuilder.group({
      title: [null, Validators.required],
      genres: [null, Validators.required], // array
      publicationDate: [null, Validators.required], // date
      pages: [null, Validators.required], // int
      author: [null, Validators.required],
      publishingCompany: [null, Validators.required],
      description: [null, Validators.required],
      synopsis: [null, Validators.required],
      bookCover: [null, Validators.required],
      purchaseLinks: [null, Validators.required] // array
    });

    this.list.push('PROFIT!!!');
  }

  submit(): void {
    this.bookService.create(this.form.value).subscribe(
      (response) => {
        // (this.property = arg)
        this.notifier.notify('success', 'Livro adicionado com sucesso!');
      },
      (error) => console.log(error.message)
    );
  }

  upload(event: any) {
    const id = Math.random()
      .toString(36)
      .substring(2);
    const file = event.target.files[0];
    const filePath = `uploads/${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.urlImage = ref.getDownloadURL();
          this.urlImage.subscribe((value) => {
            this.form.get('bookCover').setValue(value);
          });
        })
      )
      .subscribe();
  }
}
