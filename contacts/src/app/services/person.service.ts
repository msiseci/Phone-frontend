import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { Person } from '../models/person';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  apiUrl = 'https://localhost:44361/api/';
  closeEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  people: Person[] = [];
  dataLoaded = false;

  constructor(private httpClient: HttpClient) {}
  getPeople() {
    this._getPeople().subscribe((response) => {
      this.people = response.data;
      this.dataLoaded = true;
    });
  }
  _getPeople(): Observable<ListResponseModel<Person>> {
    let newPath = this.apiUrl + 'people/getall';
    return this.httpClient.get<ListResponseModel<Person>>(newPath);
  }

  add(person: Person): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'people/add',
      person
    );
  }
  update(person: Person): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'people/update',
      person
    );
  }
  // delete(personId: number): Observable<ResponseModel> {
  //   return this.httpClient.post<ResponseModel>(
  //     this.apiUrl + 'people/delete',
  //     personId
  //   );
  // }

  delete(personId: number): Observable<ResponseModel> {
    var person = this.people.find((i) => (i.personId = personId));
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'people/delete',
      person
    );
  }
}
