import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Iperso } from 'src/app/interfaces/iperso';
import { PersoService } from 'src/app/services/perso.service';

@Component({
  selector: 'app-creation-personnage',
  templateUrl: './creation-personnage.component.html',
  styleUrls: ['./creation-personnage.component.scss']
})
export class CreationPersonnageComponent implements OnInit {

  public formgroup! : FormGroup
  public perso! : Iperso;

  constructor(private _formbuilder : FormBuilder, private _persoservice : PersoService) { }

  ngOnInit(): void {
    this.formgroup = this._formbuilder.group({
      name : [null,[Validators.required]],
      lastname : [null,[Validators.required]],
      weight : [null, [Validators.required]],
      pv : [100],
      level : [1],
      xp : [0],
      face : ["perso1.png"],
      turnleft : ["leftbody.gif"],
      turnright : ["rightbody.gif"],
      frontattack : ["Attack-front.gif"],
      backattack : ["Attack-back.gif"],
      knockbackfront : ["Knockback-front.gif"],
      knockbackback : ["Knockback-back.gif"],
      attack1 : [1],
      attack2 : [2],
      attack3 : [3],
      attack4 : [4],

    })
  }

  submit(){
    //console.log(this.formgroup.value);
    this.perso = this.formgroup.value;
    
    this._persoservice.post(this.perso).subscribe({
      next: (value) =>{
        this.perso = value
        console.log(value);
      }
    })
    
  }
}
