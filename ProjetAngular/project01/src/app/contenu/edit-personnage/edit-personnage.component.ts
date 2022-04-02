import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Iperso } from 'src/app/interfaces/iperso';
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
      <div>
        <input type="text" formControlName="weight">
      </div>
      <div class="section">
        <button type="submit" [disabled]="!_formgroup.valid">EDIT</button>
      </div>
    </form>
  </div>
  <div id="img">
    <img class="fighter"[src]="'assets/'+ fighter?.frontattack" width="300" height="300" >
  </div>
</div> 
  
  `
})
export class EditPersonnageComponent implements OnInit {

  public fighterId! : number;
  public fighter! : Iperso;
  public fighterform! : Iperso;

  public _formgroup! : FormGroup

  //! => ne s'initialise pas direct, mais s'initialiseras par la suite
  //? => peut soit avoir la valeur assignée soit undefined
  constructor(private _route : ActivatedRoute,
              private _persoservice : PersoService,
              private _formbuilder : FormBuilder) { }

  ngOnInit(): void {

    this._formgroup = this._formbuilder.group({
      name : [null], //les validateurs seront set dans le queryNewPkm en fonction de la taille du nom.
      lastname : [null],
      weight : [null]
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
  }

  setValueInFormgroup(){
    this._formgroup.setValue({
      name : this.fighter.name,
      lastname : this.fighter.lastname,
      weight : this.fighter.weight,
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
      frontattack : this.fighter.frontattack
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
}
