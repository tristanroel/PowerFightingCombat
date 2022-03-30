import { Component, OnInit } from '@angular/core';
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

  constructor() { }

  ngOnInit(): void {
  }

}
