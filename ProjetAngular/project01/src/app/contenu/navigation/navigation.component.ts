import { Component, OnInit } from '@angular/core';
import { SoundsService } from 'src/app/services/sounds.service';
import { Link } from 'src/app/services/link';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  public menu : Link[] = [
    new Link("create", "contenu/creation-personnage"),
    new Link("select", "contenu/personnage"),
  ];

  constructor(private _soundservice : SoundsService) { }

  ngOnInit(): void {
  }
  alternSong(){
    this._soundservice.stopSound()
  }

}
