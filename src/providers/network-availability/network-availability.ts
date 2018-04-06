import { Injectable } from "@angular/core";
import { Network } from "@ionic-native/network";
import { AppProvider } from "../app/app";
import { Platform } from 'ionic-angular';

/*
  Generated class for the NetworkAvailabilityProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class NetworkAvailabilityProvider {
  isApp;
  constructor(public AppProvider: AppProvider, public network: Network,public platform: Platform) {
    if(this.platform.is('core') || this.platform.is('mobileweb')) {
      this.isApp = false;
    } else {
      this.isApp = true;
    }
  }

  getNetWorkStatus() {
    if(this.isApp){
      return {
        isAvailable:
          this.network.type == "unknown" || this.network.type == "none"
            ? false
            : true,
        message:
          this.network.type == "unknown" || this.network.type == "none"
            ? "You are offline"
            : "You are online",
        networkType: this.network.type
      };
    }else{
      //TODO implement for electron
      return null;
    }
  }

  setNetworkStatusDetection() {
    if(this.isApp){
      this.network.onConnect().subscribe(
        data => {
          this.displayNetworkUpdate(data.type);
        },
        error => console.error(error)
      );

      this.network.onDisconnect().subscribe(
        data => {
          this.displayNetworkUpdate(data.type);
        },
        error => console.error(error)
      );
    }else{
      //TODO implement network setup
    }
  }

  displayNetworkUpdate(connectionState: string) {
    let message = `you are ${connectionState}`;
    this.AppProvider.setTopNotification(message);
  }
}
