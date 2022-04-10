import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Iperso } from '../interfaces/iperso';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersoService {

 private _urlUser : string = "http://localhost:3000/user/";
//  private _urlCapacities : string = "http://localhost:3000/capacities";

 public idList : string[] = [];
 public character? : Iperso;
 public characters : Iperso[] = [];
 public enemyId : number = 0;
 
  constructor(private _httpclient : HttpClient) { }

  // public get(id : number) : Iperso{
  //   return this._httpclient.get<Iperso>(this._urlUser+id)


  // }
  public getAll(){ //retourne un observable de type any
    return this._httpclient.get<Iperso[]>(this._urlUser)
  }

  public getOne(id : number){
    return this._httpclient.get<Iperso>(this._urlUser + id)
    .pipe(catchError((err) => {return throwError(err)}))
  }

  public post(perso : Iperso){
    return this._httpclient.post<Iperso>(this._urlUser, perso)
  } 

  public delete(id : number) {
    return this._httpclient.delete<Iperso>(this._urlUser + id)
    // return this.getAll();
  }

  public edit(id : number, perso : Iperso){
    // let object = {name : "axel"}
      return this._httpclient.put<Iperso>(this._urlUser + id, perso)
      // .pipe(
      //   catchError(this.han)
      // )
  }


  public getAllOpponents(): Observable<number[]>{
    
    return this._httpclient.get<Iperso[]>(this._urlUser)
    .pipe(map((data) =>{
      return data.map(nombre => nombre.id)
    }))
  }

  // public gainXp(nombre : number, id : number, perso : Iperso){
  //   return this._httpclient.put<Iperso>(this._urlUser + id, perso.level + nombre)
  // }
  // public characterDie(perso : Iperso, cpt? : number){
  //   if(perso.pv <= 0){
  //      return cpt = 100;
  //   }else{
  //     return 
  //   }
  // }
  

}
