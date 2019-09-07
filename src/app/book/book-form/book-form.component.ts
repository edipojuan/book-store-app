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
  book: any = null;

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
      id: [null],
      title: [null, Validators.required],
      genres: [null, Validators.required],
      publicationDate: [null, Validators.required],
      pages: [null, Validators.required],
      author: [null, Validators.required],
      publishingCompany: [null, Validators.required],
      description: [null, Validators.required],
      synopsis: [null, Validators.required],
      bookCover: [null, Validators.required],
      purchaseLinks: [null, Validators.required]
    });

    if (this.book) {
      this.fillForm();
    }
  }

  fillForm() {
    this.form.patchValue(this.book);
  }

  submit(): void {
    const { id } = this.form.value;

    let observable;

    if (id) {
      observable = this.bookService.edit(this.form.value, id);
    } else {
      observable = this.bookService.create(this.form.value);
    }

    observable.subscribe(
      (response: any) => {
        const message = `Informações ${
          id ? 'atualizadas' : 'adicionadas'
        } com sucesso!`;

        this.notifier.notify('success', message);

        this.closeModal();
      },
      (error: any) => console.log(error.message)
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

  closeModal() {
    if (!this.bsModalRef) {
      return;
    }

    this.bsModalRef.hide();
    this.bsModalRef = null;
  }
}
