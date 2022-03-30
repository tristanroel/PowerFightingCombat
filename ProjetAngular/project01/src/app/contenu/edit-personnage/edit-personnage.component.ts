import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Iperso } from 'src/app/interfaces/iperso';
import { PersoService } from 'src/app/services/perso.service';

@Component({
  selector: 'app-edit-personnage',
  styleUrls: ['./edit-personnage.component.scss'],
  template: `

  <p>{{fighter | json}}</p>

    <form [formGroup]="_formgroup" (submit)="submit()">
        <input type="text" formControlName="name">
        <input type="text" formControlName="lastname">
        <input type="text" formControlName="weight">
        <button type="submit" [disabled]="!_formgroup.valid">SUBMIT</button>
    </form>

  
  
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
      turnleft : this.fighter.turnleft,
      turnright : this.fighter.turnright,
    }
    this._persoservice.edit(this.fighterId, this.fighterform)

    console.log(this.fighterform);
    
  }
}
