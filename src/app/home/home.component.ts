import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private readonly notifier: NotifierService;

  constructor(notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    this.notifier.notify('default', 'Bem vindo a Livraria Digital!');
    this.notifier.notify('info', 'Aqui você encontra os melhores livros!');
  }
}
