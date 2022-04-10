import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Icapacities } from 'src/app/interfaces/icapacities';
import { Iperso } from 'src/app/interfaces/iperso';
import { CapacitiesService } from 'src/app/services/capacities.service';
import { PersoService } from 'src/app/services/perso.service';

@Component({
  selector: 'app-edit-personnage',
  styleUrls: ['./edit-personnage.component.scss'],
  template: `

  <!-- <p>{{fighter | json}}</p> -->
<div id="container">  
  <div class="formulaire">
    <form [formGroup]="_formgroup" (submit)="submit()">
      <div class="section">
        <h3>Edit Your Fighter !</h3>
      </div>
      <div class="section">
        <label>FirstName :</label>
      </div>
      <div class="section">
        <input type="text" formControlName="name">
      </div>
      <div class="section">
        <label>LastName :</label>
      </div>
      <div class="section">
        <input type="text" formControlName="lastname">
      </div>
      <div class="section">
        <label>Weight :</label>
      </div>
      <div class="section">
        <input type="text" formControlName="weight">
      </div>
      <div class="section">
        <label>Attaque 1 : </label>
        <input type="number" formControlName="attack1" (change)="getAttackOne()">
        <div *ngIf="attackOne" style="color: coral;">{{attackOne?.name}} : "{{attackOne?.description}}"</div>
      </div>
      <div class="section">
        <label>Attaque 2 : </label>
        <input type="number" formControlName="attack2" (change)="getAttackTwo()">
        <div *ngIf="attackTwo">{{attackTwo?.name}} : "{{attackTwo?.description}}"</div>

      </div>
      <div class="section">
        <label>Attaque 3 : </label>
        <input type="number" formControlName="attack3" (change)="getAttackThree()">
        <div *ngIf="attackThree">{{attackThree?.name}} : "{{attackThree?.description}}"</div>

      </div>
      <div class="section">
        <label>Attaque 4 : </label>
        <input type="number" formControlName="attack4" (change)="getAttackFour()">
        <div *ngIf="attackFour">{{attackFour?.name}} : "{{attackFour?.description}}"</div>

      </div>

      <div class="section">
        <button type="submit" [disabled]="!_formgroup.valid">EDIT</button>
      </div>
    </form>
  </div>
  <div>
    <div id="stats">
      <div style="margin-left: 10px;">Level : {{fighter?.level}}</div>
      <div style="margin-left: 10px">Xp : {{fighter?.xp}}</div>
    </div>
    <div id="img">
      <img class="fighter" *ngIf="fighter?.frontattack != null" [src]="'assets/'+ fighter?.frontattack" width="300" height="300" >
    </div>
  </div>
</div> 
  
  `
})
export class EditPersonnageComponent implements OnInit {

  public fighterId! : number;
  public fighter! : Iperso;
  public fighterform! : Iperso;

  public attacklist : Icapacities[] = [];
  public attackId! : number;
  public attack! : Icapacities;

  public attackOne! : Icapacities;
  public attackTwo! : Icapacities;
  public attackThree! : Icapacities;
  public attackFour! : Icapacities;

  public _formgroup! : FormGroup

  //! => ne s'initialise pas direct, mais s'initialiseras par la suite
  //? => peut soit avoir la valeur assignée soit undefined
  constructor(private _route : ActivatedRoute,
              private _persoservice : PersoService,
              private _capacitiesservice : CapacitiesService,
              private _formbuilder : FormBuilder) { }

  ngOnInit(): void {

    this._formgroup = this._formbuilder.group({
      name : [null], //les validateurs seront set dans le queryNewPkm en fonction de la taille du nom.
      lastname : [null],
      weight : [null],
      attack1 : [0],
      attack2 : [1],
      attack3 : [2],
      attack4 : [3],
    })    

    this._route.queryParams.subscribe(params=>{
      this.fighterId = params['id'];
    })
    console.log(this.fighter);

    this._persoservice.getOne(this.fighterId).subscribe({
      next : (data)=>{
        this.fighter = data
        //console.log(data);
      },
      error: (err) => {
        console.log("flûte")
      },
      complete : ()=>{
        this.setValueInFormgroup();
      }
    })
    ///////////////////////////////////////////
    this._capacitiesservice.getAllCapacities().subscribe({
      next : (data)=>{
        this.attacklist = data;
        console.log(data);
      },
      complete : ()=>{
        this.attackOne = this.attacklist[0];
        this.attackTwo = this.attacklist[1];
        this.attackThree = this.attacklist[2];
        this.attackFour = this.attacklist[3]
      }

    })
    console.warn(this.attackOne)
    
  }

  setValueInFormgroup(){
    this._formgroup.setValue({
      name : this.fighter.name,
      lastname : this.fighter.lastname,
      weight : this.fighter.weight,
      attack1 : this.fighter.attack1,
      attack2 : this.fighter.attack2,
      attack3 : this.fighter.attack3,
      attack4 : this.fighter.attack4
    })
  }
  
  submit(){
    this.fighterform = {
      name : this._formgroup.value.name,
      lastname : this._formgroup.value.lastname,
      weight : this._formgroup.value.weight,
      face : this.fighter.face,
      id : this.fighter.id,
      pv : this.fighter.pv,
      turnleft : this.fighter.turnleft,
      turnright : this.fighter.turnright,
      backattack : this.fighter.backattack,
      frontattack : this.fighter.frontattack,
      frontknockback : this.fighter.frontknockback,
      level : this.fighter.level,
      xp : this.fighter.xp,
      attack1 : this._formgroup.value.attack1,
      attack2 : this._formgroup.value.attack2,
      attack3 : this._formgroup.value.attack3,
      attack4 : this._formgroup.value.attack4
    }
    this._persoservice.edit(this.fighterId, this.fighterform).subscribe({
      next : (data)=>{
        this.fighterform = data
      },
      // error : (err) =>{
      //   console.log(err);
        
      // }
      
    })
    
    console.log(this.fighterform);
  }
  // getOneAttack(){
  //   this._capacitiesservice.getAttack(this.attackId).subscribe({
  //     next : (data)=>{
  //       this.attack = data
  //       console.log(data.id);
        
  //     }
  //   })
  // }

///////////////////////////////////////////////////////////////////////////////////
  getAttackOne(){
    // let nameNumber = 1
    let number = this._formgroup.value.attack1
    console.log(number);
    console.log(this.attacklist[number])
    return this.attackOne = this.attacklist[number];
  }
  getAttackTwo(){
    // let nameNumber = 1
    let number = this._formgroup.value.attack2
    console.log(number);
    console.log(this.attacklist[number])
    return this.attackTwo = this.attacklist[number];
  }
  getAttackThree(){
    // let nameNumber = 1
    let number = this._formgroup.value.attack3
    console.log(number);
    console.log(this.attacklist[number])
    return this.attackThree = this.attacklist[number];
  }
  getAttackFour(){
    // let nameNumber = 1
    let number = this._formgroup.value.attack4
    console.log(number);
    console.log(this.attacklist[number])
    return this.attackFour = this.attacklist[number];
  }

}
