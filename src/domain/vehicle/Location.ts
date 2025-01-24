export class Location {
  constructor(private lat: number, private lon: number, private alt?: number) {}

  public isSameLocationAs(location: Location) {
    if (this.getLatitude() !== location.getLatitude()) return false;
    if (this.getLongitude() !== location.getLongitude()) return false;
    if (this.getAltitude() !== location.getAltitude()) return false;
    return true;
  }

  public getLatitude() {
    return this.lat;
  }

  public getLongitude() {
    return this.lon;
  }

  public getAltitude() {
    return this.alt;
  }
}
