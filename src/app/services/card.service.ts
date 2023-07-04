import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../models/card';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(
    private http:HttpClient
  ) { }

  getCards(): Observable<Card[]>
  {
    return this.http.get<Card[]>('http://demo.limantexh.com/cards/public/api/cards');
  }

}
