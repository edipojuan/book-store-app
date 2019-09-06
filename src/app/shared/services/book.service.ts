import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  url = `${environment.baseUrl}/api/book`;

  constructor(public http: HttpClient) {}

  get(params: any) {
    return this.http.get(this.url, { params });
  }

  create(data: any) {
    const body = JSON.stringify(data);
    return this.http.post(this.url, body);
  }

  edit(data: any) {
    const body = JSON.stringify(data);
    return this.http.put(`${this.url}/${data._id}`, body);
  }

  delete(id: string) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
