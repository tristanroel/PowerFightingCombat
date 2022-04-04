import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { Icapacities } from 'src/app/interfaces/icapacities';
import { Iperso } from 'src/app/interfaces/iperso';
import { CapacitiesService } from 'src/app/services/capacities.service';
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
  public enemyList : Iperso[] = [];

  public enemyNumberList : number[] = [];
  
  public unNombre : number = 1;

  public attacklist : Icapacities[] = [];
  public attackOne! : Icapacities;
  public attackTwo! : Icapacities;
  public attackThree! : Icapacities;
  public attackFour! : Icapacities;
  
  private unsubscribeGetOne! : Subscription;
  private unsubscribeOponent! : Subscription;

  public cpt : number = 0;

  public fightingText : string[] = [];

  public fighterIdle : string = "rightbody.gif";
  public fighterAtk : string = "Attack-back.gif";
  public StateOfFighter : string = this.fighterIdle;


  constructor(private _route : ActivatedRoute,
              private _persoservice : PersoService,
              private _capacitiesservice : CapacitiesService) { }

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
        this.getAllId();
        //assignation du tableau fightingtext
        //this.fightingText = this.assignText();
        this._capacitiesservice.getAllCapacities().subscribe({
          next : (data)=>{
            this.attacklist = data;
            console.log(data);
          },
          complete : ()=>{
            this.attackOne = this.attacklist[this.fighter.attack1];
            this.attackTwo = this.attacklist[this.fighter.attack2];
            this.attackThree = this.attacklist[this.fighter.attack3];
            this.attackFour = this.attacklist[this.fighter.attack4]
          }
          
    
        })

      }

    })

    // this.unsubscribeOponent = this._persoservice.getOpponent(this.fighterId).subscribe({
    //   next : (data)=>{
    //     console.log(data);
    //     this.enemy = data
    //   },
    //   error: (err) =>{
    //     console.log("sapristi saucisse!");
    //   },
    //   complete : ()=>{
    //     this.unsubscribeOponent.unsubscribe

    //     this.fightingText = this.assignText();
    //   }
    // })

    // this._capacitiesservice.getAllCapacities().subscribe({
    //   next : (data)=>{
    //     this.attacklist = data;
    //     console.log(data);
    //   },
    //   complete : ()=>{
    //     this.attackOne = this.attacklist[this.fighter.attack1];
    //     this.attackTwo = this.attacklist[this.fighter.attack2];
    //     this.attackThree = this.attacklist[this.fighter.attack3];
    //     this.attackFour = this.attacklist[this.fighter.attack4]
    //   }
      

    // })
  }

  /**
   * Récupère tous les IDs des utilisateurs dans le tableau enemyNumberList
   */
  private getAllId(){
    this._persoservice.getAllOpponents().subscribe({
      next : (data)=>{
        this.enemyNumberList = data
      },
      complete : ()=>{
        let idOfOpponent = this.getOneOpponentRandom();
        this.getOpponent(idOfOpponent)
      }
    })
  }

  private getOpponent(id:number){
    this._persoservice.getOne(id).subscribe({
      next : (data) => {this.enemy = data},
      complete : () => {this.fightingText = this.assignText();}
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
    " que voulez vous Faire ?",
    this.enemy.name +" tient des propos fort peu élogieux à l'égard de votre mère !!!",
    "montrez lui ce qu'il en coûte d'oser prononcer le nom de votre bien aimée maman dans ce contexte inaproprié"
    ]
  }


  actionAttack(id : number){
    console.log(this.attacklist[id].damage);
    console.log(this.enemy.pv);

    this.StateOfFighter = this.fighterAtk;
    setTimeout(() => {
      this.StateOfFighter = this.fighterIdle
    }, 995);

    this.enemy.pv = (this.enemy.pv) - (this.attacklist[id].damage);
    this.cpt++;
  }

  characterDie(){
    if(this.fighter.pv <= 0){
    }
  }

  /**
   * 
   * @returns fonction retourne un Id d'ennemi tiré aléatoirement 
   * et qui n'est pas celui que l'on a choisi au départ
   */
  getOneOpponentRandom(){
    let randomNbr = Math.floor(Math.random() * this.enemyNumberList.length)

    while(this.enemyNumberList[randomNbr] == this.fighter.id){

      randomNbr = Math.floor(Math.random() * this.enemyNumberList.length)
     
    }
     return this.enemyNumberList[randomNbr]
  }

}
