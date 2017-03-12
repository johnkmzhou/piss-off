import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { RaceComponent } from './race/race.component';
import { UrinalComponent } from './race/urinal/urinal.component';
import { RaceService } from './race/race.service';

@NgModule({
  declarations: [
    AppComponent,
    RaceComponent,
    UrinalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [RaceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
