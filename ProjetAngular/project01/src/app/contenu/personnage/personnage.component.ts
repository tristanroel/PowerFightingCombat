import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Iperso } from 'src/app/interfaces/iperso';
import { PersoService } from 'src/app/services/perso.service';
import { RoutingParamsService } from 'src/app/services/routing-params.service';

@Component({
  selector: 'app-personnage',
  
  styleUrls: ['./personnage.component.scss'],
  template: `
  
  <div id="contenu">
  
    <div id="container">
        <div class="charact" *ngFor="let item of persos;let i = index">
          <div>
            {{item.name}}
          </div>
          <div>
            <img [src]="'assets/'+ item.face" width="200" height="200"(click)="getOneCharacter(item.id)">
          </div>
          <div>
            <input class="button" type="button" value="DELETE"(click)="deleteCharacter(item.id)">
            <!-- <a routerLink="contenu/edit-personnage"><button class="button">EDIT</button></a> -->
            <input class="button" type="button" value="EDIT" (click)="goEdit()">
          </div>
        </div>  
    </div>
    
      <div id="info" *ngIf="character != undefined">
        <div>
          {{character?.name}}
        </div>
        <div>
          {{character?.lastname}}
        </div>
        <div>
          {{character?.weight}}
        </div>
        <div>
          <img class="fighter"[src]="'assets/'+ character?.turnleft" width="200" height="200" >
        </div>
        <div class="center">
          <input class="goButton" type="button" value="Lets Fight!" (click)="lesgo()">
        </div>
      </div>
</div>   
  `
})
export class PersonnageComponent implements OnInit {

  persos : Iperso[] = [];
  public character? : Iperso;


  constructor(private _persoservices : PersoService,
              private _router : Router,
              private _routinparamservice : RoutingParamsService) {}

  ngOnInit(): void {
    this._persoservices.getAll().subscribe({
      next : (letype)=>
      {
        this.persos = letype
        console.log(letype);
      }
    })
    console.log(this.character)
  }

  getOneCharacter(id : number){
    
     console.log(this.persos.find(perso=>perso.id == id ));
     this.character = this.persos.find(perso=>perso.id == id)
    
  }

  deleteCharacter(id : number){
    //console.log(id);
    this._persoservices.delete(id).subscribe({
      complete : ()=>{
        this.persos =  this.persos.filter(perso=>perso.id != id) // si l'id est different de l'id que je veux supprimer je le renvoie dans perso
      }
    })
  }

  lesgo(){
    let route ="contenu/fight-area";
    let chaine = this.character?.id
      this._routinparamservice.paramsUrlAssociate(route, chaine);
    //this._router.navigate(["contenu/fight-area"], {queryParams: {fighterName : this.character?.name }} );
  }
  goEdit(){
    let route ="contenu/edit-personnage";
    let chaine = this.character?.id
      this._routinparamservice.paramsUrlAssociate(route, chaine);
  }
    


}
