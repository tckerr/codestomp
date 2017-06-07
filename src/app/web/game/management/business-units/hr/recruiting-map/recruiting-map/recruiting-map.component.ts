import {ChangeDetectorRef, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {IStateData, MapDataProviderService} from '../map-data-provider.service';

@Component({
   selector: 'app-recruiting-map',
   templateUrl: './recruiting-map.component.html',
   styleUrls: ['./recruiting-map.component.css']
})
export class RecruitingMapComponent implements OnInit, OnDestroy {
   private map;


   @ViewChild('mapContainer') mapContainer: ElementRef;
   @Output() stateSelected: EventEmitter<IStateData> = new EventEmitter();

   constructor(private mapDataProviderService: MapDataProviderService,
               private ref: ChangeDetectorRef) {
   }

   ngOnInit() {
      setTimeout(function() {
         this.map = anychart.map();

         let dataSet = anychart.data.set(this.mapDataProviderService.mapData);
         this.map.geoData('anychart.maps.united_states_of_america');
         this.map.padding(0).margin(0);
         this.configureSeries(dataSet);
         this.configureZoom();
         this.map.container(this.mapContainer.nativeElement.id);
         this.configureEventListener();
         this.map.draw();
      }.bind(this),1);
   }

   ngOnDestroy(): void {
      this.map && this.map.removeAllListeners();
   }

   private configureEventListener() {
      this.map.listen('pointsSelect', function (e) {
         let selectedPoint = e.seriesStatus[0].nearestPointToCursor.point;
         this.stateSelected.emit(selectedPoint.properties);
         this.ref.detectChanges();
      }.bind(this));
   }

   private configureZoom() {
      var zoomController = anychart.ui.zoom();
      zoomController.render(this.map);
   }

   private configureSeries(dataSet) {
      let series = this.map.choropleth(dataSet);
      this.setMapColorScheme(series);
      series.selectionMode('singleSelect');
      series.tooltip().format(function () {
         return this.name;
      });
   }

   private setMapColorScheme(series) {
      series.colorScale(anychart.scales.linearColor('#5bc0de', '#428bca'));
      series.hoverFill('#f0ad4e');
      series.selectFill('#f0ad4e');
   }

}
