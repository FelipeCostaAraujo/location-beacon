import { Component, OnInit } from '@angular/core';
import { IBeacon } from '@ionic-native/ibeacon/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  id_Beacons = "Seu uid-beacon";

  constructor(private ibeacon: IBeacon) { }

  ngOnInit() {
    //this.iBeaconTest();
  }

  iBeaconTest() {
    // Request permission to use location on iOS
    this.ibeacon.requestAlwaysAuthorization();
    // create a new delegate and register it with the native layer
    const delegate = this.ibeacon.Delegate();

    // Subscribe to some of the delegate's event handlers
    delegate.didRangeBeaconsInRegion()
      .subscribe(
        data => console.log('didRangeBeaconsInRegion: ', data),
        error => console.error()
      );
    delegate.didStartMonitoringForRegion()
      .subscribe(
        data => console.log('didStartMonitoringForRegion: ', data),
        error => console.error()
      );
    delegate.didEnterRegion()
      .subscribe(
        data => {
          console.log('didEnterRegion: ', data);
        }
      );

    let beaconRegion = this.ibeacon.BeaconRegion('deskBeacon', this.id_Beacons);

    this.ibeacon.startMonitoringForRegion(beaconRegion)
      .then(
        () => console.log('Native layer received the request to monitoring'),
        error => console.error('Native layer failed to begin monitoring: ', error)
      );
  }

  createBeacon() {
    var identifier = 'beaconAtTheMacBooks'; // mandatory
    var minor = 1000; // optional, defaults to wildcard if left empty
    var major = 5; // optional, defaults to wildcard if left empty

    // throws an error if the parameters are not valid
    const beaconRegion = this.ibeacon.BeaconRegion(identifier, this.id_Beacons, major, minor);
   
    return beaconRegion;   
}

startLocation(){
  const logToDom =(message) => {
    const e = document.createElement('label');
    e.innerText = message;
  
    const br = document.createElement('br');
    const br2 = document.createElement('br');
    document.body.appendChild(e);
    document.body.appendChild(br);
    document.body.appendChild(br2);
  };
  
  const delegate = new cordova.plugins["locationManager"].Delegate();
    
  delegate.didDetermineStateForRegion = (pluginResult) => {
  
      logToDom('[DOM] didDetermineStateForRegion: ' + JSON.stringify(pluginResult));
  
      cordova.plugins["locationManager"].appendToDeviceLog('[DOM] didDetermineStateForRegion: '
          + JSON.stringify(pluginResult));
  };
  
  delegate.didStartMonitoringForRegion =  (pluginResult) => {
      console.log('didStartMonitoringForRegion:', pluginResult);
  
      logToDom('didStartMonitoringForRegion:' + JSON.stringify(pluginResult));
  };
  
  delegate.didRangeBeaconsInRegion = (pluginResult) => {
      logToDom('[DOM] didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult));
  };
  
  const identifier = 'beaconOnTheMacBooksShelf';
  const minor = 1000;
  const major = 5;

  const beaconRegion = new cordova.plugins["locationManager"].BeaconRegion(identifier, this.id_Beacons, major, minor);
  
  cordova.plugins["locationManager"].setDelegate(delegate);
  
  // required in iOS 8+
  cordova.plugins["locationManager"].requestWhenInUseAuthorization(); 
  // or cordova.plugins.locationManager.requestAlwaysAuthorization()
  
  cordova.plugins["locationManager"].startMonitoringForRegion(beaconRegion)
    .fail((e) => { console.error(e); })
    .done();
}

}
