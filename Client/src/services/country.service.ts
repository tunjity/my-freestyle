
  import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
interface ApiResponse<T> {
    status: string;
    message: string;
    data: T;
  }
interface Item {
    name: string;
    createdAt: string;
  }
  @Injectable({
    providedIn: 'root'
  })

export class ItemService {
    private apiUrl = 'http://localhost:3000/api/Countrys';
  
    constructor(private http: HttpClient) { }
  
    getItems(): Observable<ApiResponse<Item[]>> {
      return this.http.get<ApiResponse<Item[]>>(this.apiUrl);
    }
    addItem(item: any): Observable<ApiResponse<Item>> {
        return this.http.post<ApiResponse<Item>>(this.apiUrl, item);
      }
    createItem(item: Item): Observable<Item> {
      return this.http.post<Item>(this.apiUrl, item);
    }
  }