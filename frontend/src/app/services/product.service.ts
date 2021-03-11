import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { productModel } from '../models/product.model';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  
  private baseUrl = "http://localhost:8000/api/";

  AllProducts = new BehaviorSubject<productModel[]>(null);
  
  headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');

  constructor(private http:HttpClient) { 

    this.getFromDb("");

  }



  public add(form){
    return this.http.post(this.baseUrl+"add", form);
  }
  public delete(id){
    return this.http.post(this.baseUrl+"delete?id="+id,null );
  }
  public update(form){
    return this.http.post(this.baseUrl+"update", form);
  }
  public getFromDb(keys){
    return this.http.post(this.baseUrl+"show?keys="+keys, null).subscribe(res=>{
      var r:any = res;
      this.AllProducts.next(r.products)
    });
  }

}
