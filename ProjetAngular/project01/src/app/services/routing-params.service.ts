import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Iperso } from '../interfaces/iperso';

@Injectable({
  providedIn: 'root'
})
export class RoutingParamsService {

 
  constructor(private _router : Router) { }

  public paramsUrlAssociate(route : string ,persoId? : number){
    this._router.navigate([route], {queryParams: {id: persoId}})
  }

  // public persoValid(perso : string) : Iperso | undefined{
  //   if(perso == this.persoName?.name){
  //     return this.persoName
  //   }
  // }
}
