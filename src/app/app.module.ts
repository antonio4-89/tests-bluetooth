import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


//PLugins
import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial/ngx'
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx'


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

    //Provedor plugin de bluetooth
      BluetoothSerial, 
    //Provedor para solicitar permisos en tiempo de ejecucion android
      AndroidPermissions
    ],
  bootstrap: [AppComponent],
})
export class AppModule {}
