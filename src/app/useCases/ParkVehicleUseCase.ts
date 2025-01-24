import { IFleetRepository } from "../../domain/fleet/FleetRepository";
import { Location } from "../../domain/vehicle/Location";

interface ParkVehicleParams {
  fleetId: string;
  plateNumber: string;
  lat: string | number;
  lon: string | number;
  alt?: string | number;
}

export class ParkVehicleUseCase {
  constructor(private readonly fleetRepository: IFleetRepository) {}

  async execute(params: ParkVehicleParams) {
    const { fleetId, plateNumber, lat, lon, alt } = params;

    const fleet = await this.fleetRepository.getFleetByID(fleetId);
    if (!fleet) throw new Error("No fleet has been found.");

    const nbLat = typeof lat === "string" ? parseFloat(lat) : lat;
    const nbLon = typeof lon === "string" ? parseFloat(lon) : lon;
    const nbAlt = !alt
      ? undefined
      : typeof alt === "string"
      ? parseFloat(alt)
      : alt;

    const location = new Location(nbLat, nbLon, nbAlt);

    const matchingVehicle = fleet
      .getVehicles()
      .find((v) => v.getPlateNumber() === plateNumber);

    if (!matchingVehicle) throw new Error("This vehicle is not in this fleet.");

    matchingVehicle.park(location);
    return this.fleetRepository.localizeVehicle(fleetId, plateNumber, location);
  }
}
