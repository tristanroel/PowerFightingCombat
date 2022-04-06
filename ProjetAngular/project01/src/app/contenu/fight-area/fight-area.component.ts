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
  enemyAttackName! : string;

  public enemyNumberList : number[] = [];
  
  public unNombre : number = 1;

  public attacklist : Icapacities[] = [];
  public attackName! : string ;
  public attackOne! : Icapacities;
  public attackTwo! : Icapacities;
  public attackThree! : Icapacities;
  public attackFour! : Icapacities;

  private unsubscribeGetOne! : Subscription;
  private unsubscribeOponent! : Subscription;

  public cpt : number = 1;
  public oldCompeur! : number;

  public fightingText : string[] = [];

  public ActionFighterNumbers : number[] = [2];
  public ActionEnemyNumbers : number[] = [5];

  public fighterIdle : string = "rightbody.gif";
  public fighterAtkAnim : string = "Attack-back.gif";
  public StateOfFighter : string = this.fighterIdle;

  public enemyIdle : string = "leftbody.gif";
  public enemyAtkAnim : string = "Attack-front.gif";
  public StateOfEnemy : string = this.enemyIdle

  constructor(private _route : ActivatedRoute,
              private _routingparamservice : RoutingParamsService,
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
            this.attackFour = this.attacklist[this.fighter.attack4];

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
//contexte combat
    if(this.cpt % 6 == 0 && this.cpt < 100){
      this.enemyAttack();
    }
  }

  public switchAtkName(){
    let ocv = this.oldCompeur
    console.log("oldcpt depuis le switchatkname : "+ ocv); 
    console.log("nouveau cpt : "+ this.cpt);
    this.cpt = (this.cpt - this.cpt) + (ocv + 2) ;
  }

  assignText(){
    if(this.fighter == undefined){
      return []
    }
    if(this.enemy == undefined){
      return []
    }
    if(this.attackName == undefined){
      undefined
    }

    return [
      "",
     this.fighter.name + " entre dans l'arene !!",
     this.enemy.name + " veut clairement vous voir mort !",
    " que voulez vous faire ?",
    "",
    "la tension est palpable !! "+this.fighter.name+" et "+this.enemy.name +" ne se lachent pas du regard !",
    this.enemy.name + " envoie l'attaque " + this.enemyAttackName,
    this.enemy.name +" tient des propos fort peu élogieux à l'égard de votre mère !!!",
    "montrez lui ce qu'il en coûte d'oser prononcer le nom de votre bien aimée maman dans ce contexte inaproprié",
    "donnez lui une bonne leçon !",
    "",
    "Quel combat intense !!!",
    this.enemy.name + " vous attaque avec "+ this.enemyAttackName,
    "Les coups de "+this.enemy.name + " sont extrêmement agressifs !",
    "mais " +this.fighter.name+" n'est pas en reste ...",
    "comment comptez vous réagir ?",
    this.fighter.name + " fait preuve de style avec " + this.attackName,
    "Impossible de prédire l'issue de ce combat !!",
    this.enemy.name + " sollicite toutes sa puissance avec " +this.enemyAttackName,
    "La foule est en délire !!!",
    "Ces deux puisants athlètes semblent imperturbable !",
    "à vous de jouer ! 21",
    "",
    "",
    this.enemy.name + " vous attaque avec "+ this.enemyAttackName,
    "",
    "",
    "à vous d'attaquer !27",
    "",
    "Aucun des deux adversaire ne semble vouloir céder la victoire à l'autre !",
    this.enemy.name + " vous attaque avec "+ this.enemyAttackName,
    "",
    "Nous avons sur le ring deux superbes combattant !!!",
    "choisissez une attaque !33",
    "",
    "",
    this.enemy.name + " riposte avec "+ this.enemyAttackName+ " !",
    "",
    "",
    "Que voulez vous faire ?",
    "",
    "",
    this.enemy.name + " vous attaque avec "+ this.enemyAttackName,
    "",
    "",
    "à vous de jouer !",
    "",
    "",
    this.enemy.name + " vous attaque avec "+ this.enemyAttackName,
    "",
    "",
    "C'est votre tour",
    "",
    "",
    this.enemy.name + " vous attaque avec "+ this.enemyAttackName,
    "",
    "",
    "57",
    "",
    "",
    this.enemy.name + " vous attaque avec "+ this.enemyAttackName,
    "",
    "",
    "63",
    "",
    "",
    this.enemy.name + " vous attaque avec "+ this.enemyAttackName,
    "",
    "",
    "69",
    "",
    "",
    this.enemy.name + " vous attaque avec "+ this.enemyAttackName,
    "",
    "",
    "75",
    "",
    "",
    this.enemy.name + " vous attaque avec "+ this.enemyAttackName,
    "",
    "",
    "81",
    "",
    "",
    this.enemy.name + " vous attaque avec "+ this.enemyAttackName,
    "",
    "",
    "87",
    "",
    "",
    this.enemy.name + " vous attaque avec "+ this.enemyAttackName,
    "",
    "",
    "93",
    "",
    "",
    this.enemy.name + " vous attaque avec " + this.enemyAttackName,
    "",
    "",
    "99",
    this.fighter.name+ " attaque avec !...oh !?...WHOOOOAAAAAAW !!!!!! "+ this.enemy.name +" s'éfondre au sol !! ",
    this.enemy.name + " est K.O !",
    this.fighter.name + "remporte la victoire !!!",
    "Vous gagnez tatatata point Experience",
    "",
    "105",
    this.fighter.name + " envoie l'attaque " + this.attackOne.name+" !",
    this.fighter.name + " utilise l'attaque " + this.attackTwo.name+" !!",
    this.fighter.name + " envoie l'attaque " + this.attackThree.name+" !!!",
    this.fighter.name + " envoie l'attaque " + this.attackFour.name+" !!!!",
    ""


    ]
  }


  public actionAttack(id : number){
    //console.log(this.attacklist[id].damage);
    //console.log(this.enemy.pv);
     let atkid = this.attacklist[id].id
      console.log("id actuel : "+atkid);

      let atkList = [this.attackOne.id, this.attackTwo.id, this.attackThree.id, this.attackFour.id];
      let cptAtkNbr = atkList.indexOf(atkid);
     
     this.StateOfFighter = this.fighterAtkAnim;
     setTimeout(() => {
       this.StateOfFighter = this.fighterIdle
      }, 720);

      let OldCpt = this.cpt
      
      this.enemy.pv = (this.enemy.pv) - (this.attacklist[id].damage);
      
      if(this.enemy.pv <= 0){
        console.log("enemy die");
        this.upXp();
        console.log("xp joueur :" + this.fighter.xp);
        this.enemy.pv = 0;
        this.cpt = 100;
      }else{
        
      console.log("le vieux compteur : " + OldCpt);
      this.oldCompeur = OldCpt;
      this.cpt = this.cpt - this.cpt + ((105) + (cptAtkNbr + 1));
      console.log("le compteur est a : " + this.cpt);
      
    }
  }
  

  public enemyAttack(){
    //console.log(this.enemy.name);    
    let atkTab = [this.enemy.attack1,this.enemy.attack2,this.enemy.attack3,this.enemy.attack4]
    //console.log(atkTab);
    let randomNbr = Math.floor(Math.random() * atkTab.length)
    this.enemyAttackName = this.enemyAttackName + this.attacklist[randomNbr].name
    this.fighter.pv = (this.fighter.pv) - (this.attacklist[randomNbr].damage);
    this.StateOfEnemy = this.enemyAtkAnim;

    this.StateOfEnemy = this.enemyAtkAnim;
    setTimeout(() => {
      this.StateOfEnemy = this.enemyIdle
    }, 995);
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

  upXp(){
    console.log("yoyo");
    
    return this.fighter.xp = this.fighter.xp + 10
  }

  return(){
    let route = "contenu/personnage"
    this._routingparamservice.paramsUrlAssociate(route)
  }

}
