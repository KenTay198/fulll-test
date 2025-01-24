import { IFleetRepository } from "../../domain/fleet/FleetRepository";
import { Location } from "../../domain/vehicle/Location";

type Coord = string | number;

interface ParkVehicleParams {
  fleetId: string;
  plateNumber: string;
  lat: Coord;
  lon: Coord;
  alt?: Coord;
}

export class ParkVehicleUseCase {
  constructor(private readonly fleetRepository: IFleetRepository) {}

  private formatLocation(lat: Coord, lon: Coord, alt?: Coord): Location {
    const nbLat = typeof lat === "string" ? parseFloat(lat) : lat;
    const nbLon = typeof lon === "string" ? parseFloat(lon) : lon;
    const nbAlt = !alt
      ? undefined
      : typeof alt === "string"
      ? parseFloat(alt)
      : alt;

    return new Location(nbLat, nbLon, nbAlt);
  }

  async execute(params: ParkVehicleParams) {
    const { fleetId, plateNumber, lat, lon, alt } = params;

    const fleet = await this.fleetRepository.getFleetByID(fleetId);
    if (!fleet) throw new Error("No fleet has been found.");

    const location = this.formatLocation(lat, lon, alt);

    const matchingVehicle = fleet
      .getVehicles()
      .find((v) => v.getPlateNumber() === plateNumber);

    if (!matchingVehicle) throw new Error("This vehicle is not in this fleet.");

    matchingVehicle.park(location);
    this.fleetRepository.localizeVehicle(fleetId, plateNumber, location);
  }
}
