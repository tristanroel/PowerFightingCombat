import { Component, OnInit } from '@angular/core';
import { Iperso } from 'src/app/interfaces/iperso';

@Component({
  selector: 'app-fight-area',
  templateUrl: './fight-area.component.html',
  styleUrls: ['./fight-area.component.scss']
})
export class FightAreaComponent implements OnInit {

  public perso? : Iperso;
  constructor() { }

  ngOnInit(): void {
  }

  letsparty(){
    
  }

}
