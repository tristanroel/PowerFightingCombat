import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { Iperso } from 'src/app/interfaces/iperso';
import { PersoService } from 'src/app/services/perso.service';
import { RoutingParamsService } from 'src/app/services/routing-params.service';


@Component({
  selector: 'app-fight-area',
  templateUrl: './fight-area.component.html',
  styleUrls: ['./fight-area.component.scss']
})
export class FightAreaComponent implements OnInit {

  public fighterId! : number;
  public fighter! : Iperso;
  public enemy! : Iperso;
  
  public unNombre : number = 1;
  
  private unsubscribeGetOne! : Subscription;
  private unsubscribeOponent! : Subscription;

  public cpt : number = 0;

  public fightingText : string[] = []

  constructor(private _route : ActivatedRoute,
              private _persoservice : PersoService) { }

  ngOnInit(): void {
    
    this._route.queryParams.subscribe(params=>{
      this.fighterId = params['id'];
    })
    console.log(this.fighterId);

    this.unsubscribeGetOne = this._persoservice.getOne(this.fighterId).subscribe({
      next : (data)=>{
        this.fighter = data
        //console.log(data);
      },
      error: (err) => {
        console.log("flûte")
      },
      complete : ()=>{
        this.unsubscribeGetOne.unsubscribe;
        //assignation du tableau fightingtext
        this.fightingText = this.assignText();
      }

    })
    
    this.unsubscribeOponent = this._persoservice.getOpponent(this.fighterId).subscribe({
      next : (data)=>{
        console.log(data);
        this.enemy = data
      },
      error: (err) =>{
        console.log("sapristi saucisse!");
      },
      complete : ()=>{
        this.unsubscribeOponent.unsubscribe

        this.fightingText = this.assignText();
      }
    })
  }

  switchText(){
    let response = this.fightingText[this.cpt]
    console.log(response);
    console.log(this.cpt);
    
    this.cpt++
  }

  assignText(){
    if(this.fighter == undefined){
      return []
    }
    if(this.enemy == undefined){
      return []
    }

    return [
     this.fighter.name + " entre dans l'arene !!",
     this.enemy.name + " veut clairement vous voir mort !",
    " que voulez vous Faire ?"
    ]
  }


}
