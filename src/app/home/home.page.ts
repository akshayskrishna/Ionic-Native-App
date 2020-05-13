import { Component } from '@angular/core';
import { Vibration } from '@ionic-native/vibration/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  myphoto:string;
  lat:any;
  long:any;
  constructor(
    private vibration: Vibration, 
    private camera: Camera,
    private flashlight: Flashlight,
    private geolocation: Geolocation
    ) {


  }

  flash(){
 
      this.flashlight.toggle();
  
  }
  flashoff(){
    this.flashlight.switchOff();
  }

  takephoto(){
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.myphoto = 'data:image/jpeg;base64,';
    }, (err) => {
     console.log(this.myphoto);
    });

  }

  vibrate(){
    this.vibration.vibrate([400, 50, 100, 50, 400]);
  }

  getGeo(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.long = resp.coords.longitude;
     });
  }

}
