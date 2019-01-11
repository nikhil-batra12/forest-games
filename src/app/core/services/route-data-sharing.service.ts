import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RouteDataSharingService {

  routeData: any = {};
  constructor(
    private router: Router
  ) { }

  setRouteData(config: { routeName: string; routeData: any }) {
    this.routeData[config.routeName] = config.routeData;
  }
  // Use preserve: true to preserve data after get, else data will be removed
  getRouteData(stateName: string, preserve?: boolean) {
    const data = Object.keys(this.routeData).length ? this.routeData[stateName] : null;
    if (!preserve && this.routeData[stateName]) {
      delete this.routeData[stateName];
    }
    return data;
  }

  clearRouteDate(stateName: string) {
    if (this.routeData[stateName]) {
      delete this.routeData[stateName];
    }
  }
}
