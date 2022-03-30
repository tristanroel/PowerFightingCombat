import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Iperso } from '../interfaces/iperso';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersoService {

 private _urlUser : string = "http://localhost:3000/user/";
 private _urlCapacities : string = "http://localhost:3000/capacities";

 public character? : Iperso;
 public characters : Iperso[] = []

  constructor(private _httpclient : HttpClient) { }

  // public get(id : number) : Iperso{
  //   return this._httpclient.get<Iperso>(this._urlUser+id)


  // }
  public getAll(){ //retourne un observable de type any
    return this._httpclient.get<Iperso[]>(this._urlUser)

  }

  public getOne(id : number){
    return this._httpclient.get<Iperso>(this._urlUser + id)
  }

  public post(perso : Iperso){
    return this._httpclient.post<Iperso>(this._urlUser, perso)
  } 

  public delete(id : number) {
    return this._httpclient.delete<Iperso>(this._urlUser + id)
    // return this.getAll();
  }

  public edit(id : number, perso : Iperso){
    let object = {name : "axel"}
    return this._httpclient.put<Iperso>(this._urlUser + 1, JSON.stringify(object))
  }
}
