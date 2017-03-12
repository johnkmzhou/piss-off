import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Urinal } from '../urinal'
@Component({
  selector: 'urinal',
  templateUrl: './urinal.component.html',
  styleUrls: ['./urinal.component.css']
})
export class UrinalComponent implements OnInit {
  @Input() urinal: Urinal;
  maskUrinalinitialPosition = 282.36221
  constantPixelIncrement = 5
  maskUrinalDAttribute = `m 129.9,282.36221 c -4.71405,0 -10,5.28595 -10,10 l 0,240 c 0,24.26703 45.96753,25.63413 70,29 16.50557,2.31169 33.49443,2.31169 50,0 24.03247,-3.36587 70,-4.73297 70,-29 l 0,-240 c 0,-4.71405 -5.28595,-10 -10,-10 z`;
  horseImage = '../../../assets/images/horse.gif'
  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    this.urinal.socket.subscribe(msg => {
      console.log(msg.data);
      if (msg.data === 0) return;
      this.urinal.percentage += parseInt(msg.data);

      let elUrinal = this.elementRef.nativeElement.querySelector('#urinal-mask')
      if (!elUrinal) return;
      let newPossition = this.calculateNewPosition().toString()
      elUrinal.setAttribute("d", this.maskUrinalDAttribute.replace(this.maskUrinalinitialPosition.toString(), newPossition));
    });
  }

  calculateNewPosition(): number {
    return this.maskUrinalinitialPosition - this.constantPixelIncrement * this.urinal.percentage - this.constantPixelIncrement;
  }
}
