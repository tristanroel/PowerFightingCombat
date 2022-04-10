import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoundsService {

  public Sound  : HTMLAudioElement = new Audio;
  
  constructor() { }

  public playSound(){
    var audio = new Audio();
    this.Sound.src = "../../../assets/fightsong.wav"
    this.Sound.load();
    this.Sound.volume = 0.01;
    this.Sound.play()
    this.Sound.loop = true
  }
  public stopSound(){
    this.Sound.pause();
  }
}
