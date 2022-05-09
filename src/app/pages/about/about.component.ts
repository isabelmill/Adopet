import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { } from 'googlemaps';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {


  @ViewChild('map') mapElement: ElementRef;
  map: google.maps.Map;


  async ngOnInit(): Promise<void> {
    const myLatLng = { lat: 32.0750, lng: 34.7749 };
    const mapProperties = await {
      center: new google.maps.LatLng(32.0750, 34.7749),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
    console.log(this.map);

  }

  send(): void {
   alert('Not A Real E-mail')
  }

}
