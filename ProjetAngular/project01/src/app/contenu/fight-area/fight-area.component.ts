import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iperso } from 'src/app/interfaces/iperso';
import { PersoService } from 'src/app/services/perso.service';
import { RoutingParamsService } from 'src/app/services/routing-params.service';

@Component({
  selector: 'app-fight-area',
  templateUrl: './fight-area.component.html',
  styleUrls: ['./fight-area.component.scss']
})
export class FightAreaComponent implements OnInit {

  public fighterName : string = ""
  public fighter? : Iperso;
  public persos : Iperso[] = [];
  public persoId? : number = (this.fighter?.id)

  

  constructor(private _route : ActivatedRoute,
              private _persoservice : PersoService) { }

  ngOnInit(): void {
    
    this._route.queryParams.subscribe(params=>{
      this.fighterName = params['fighterName'];
    })
    console.log(this.fighterName);


    
    
    
  }


  // getOneCharacter(fighterName : string){
  //   console.log(this.persos.find(perso=>perso.name == fighterName));
  //   this.fighter = this.persos.find(perso=>perso.name == fighterName)
  // }
  
  // validCharacter(){
  //     if(this.fighterName == this.perso?.name){
  //       console.log(this.perso.name);
  //       return this.perso!
  //     }else{
  //       console.log("oups");
  //       return undefined
  //     }
    
  // }

}
