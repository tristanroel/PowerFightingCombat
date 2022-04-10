import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Iperso } from 'src/app/interfaces/iperso';
import { PersoService } from 'src/app/services/perso.service';
import { RoutingParamsService } from 'src/app/services/routing-params.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Subscription } from 'rxjs';
import { Icapacities } from 'src/app/interfaces/icapacities';
import { SoundsService } from 'src/app/services/sounds.service';

@Component({
  selector: 'app-personnage',
  animations: [],
  styleUrls: ['./personnage.component.scss'],
  template: `

  <div id="space"></div>
  <div id="contenu">
  
    <div id="container">
        <div class="charact" *ngFor="let item of persos;let i = index">
          <div>
            {{item?.name}}
          </div>
          <div>
            <img id="slctcharacter" [src]="'assets/'+ item?.face"(click)="getOneCharacter(item.id)">
          </div>
          <!-- <div class="boutons"> -->
            <input class="btn" type="button" value="DELETE"(click)="deleteCharacter(item.id)">
            <!-- <a routerLink="contenu/edit-personnage"><button class="button">EDIT</button></a> -->
            <input class="btn" type="button" value="EDIT" (click)="goEdit(item.id)">
          <!-- </div> -->
        </div>  
    </div>
</div>
<div id="contenu">

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
        <div id="anim">
          <img class="fighter"[src]="'assets/'+ character?.turnleft" >
        </div>
        <div class="center">
          <input class="goButton" type="button" value="Lets Fight!" (click)="lesgotoArena()">
        </div>
      </div>
</div>   
  `
})
export class PersonnageComponent implements OnInit {

  persos : Iperso[] = [];
  public character? : Iperso;
  

  private getAllService! : Subscription;


  constructor(private _persoservices : PersoService,
              private _soundservice : SoundsService,
              private _router : Router,
              private _routinparamservice : RoutingParamsService) {}

  ngOnInit(): void {
    this.getAllService = this._persoservices.getAll().subscribe({
      next : (letype)=>
      {
        this.persos = letype
        console.log(letype);
      },
      complete : ()=>{
        this.getAllService.unsubscribe();  // desouscris et permet de liberer de la memoire
      }
    })
    console.log(this.character)
  }

  getOneCharacter(id : number){
    
     console.log(this.persos.find(perso=>perso.id == id ));
     this.character = this.persos.find(perso=>perso.id == id);
    
  }

  deleteCharacter(id : number){
    //console.log(id);
    this._persoservices.delete(id).subscribe({
      complete : ()=>{
        this.persos =  this.persos.filter(perso=>perso.id != id) // si l'id est different de l'id que je veux supprimer je le renvoie dans perso
      }
    })
  }

  lesgotoArena(){
    let route ="contenu/fight-area";
    let chaine = this.character?.id
      this._routinparamservice.paramsUrlAssociate(route, chaine);
    //this._router.navigate(["contenu/fight-area"], {queryParams: {fighterName : this.character?.name }} );
   this._soundservice.playSound()
  }
  goEdit(id : number){
    let route ="contenu/edit-personnage";
    //let chaine = this.character?.id
      this._routinparamservice.paramsUrlAssociate(route, id);
  }
    


}
