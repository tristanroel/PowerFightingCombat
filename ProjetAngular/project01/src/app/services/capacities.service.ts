import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Icapacities } from '../interfaces/icapacities';

@Injectable({
  providedIn: 'root'
})
export class CapacitiesService {

  private _urlCapacities : string = "http://localhost:3000/capacities/";

  public attacks : Icapacities[] = [];


  constructor(private _httpclient : HttpClient) { }

  getAllCapacities(){
    return this._httpclient.get<Icapacities[]>(this._urlCapacities)
  }

  getAttack(id : number){
    return this._httpclient.get<Icapacities>(this._urlCapacities + id)
  }
  

}

