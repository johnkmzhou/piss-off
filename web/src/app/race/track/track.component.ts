import { Component, OnInit, Input } from '@angular/core';
import { Urinal } from '../urinal'
@Component({
  selector: 'track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {
  @Input() urinal: Urinal;
  horseImage = '../../../assets/images/horse.gif'
  constructor() { }

  ngOnInit() {
  }

}
