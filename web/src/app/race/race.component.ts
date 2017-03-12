import { Component, OnInit } from '@angular/core';
import { TrackComponent } from './track/track.component';
import { RaceService } from './race.service'

@Component({
  selector: 'race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.css']
})
export class RaceComponent implements OnInit {

  constructor(private raceService: RaceService) { }

  ngOnInit() {
  }

}
