import { Fleet } from "../../../domain/fleet/Fleet";
import {
  CreateFleet,
  GetFleetByID,
  GetFleetsByUserID,
  IFleetRepository,
  LocalizeVehicle,
  UpdateVehicles,
} from "../../../domain/fleet/FleetRepository";

const fleets: Fleet[] = [];

export class FleetRepositoryStub implements IFleetRepository {
  public createFleet: CreateFleet = async (userId) => {
    let newFleetID = Math.random().toString(36).substring(2, 7);
    while (fleets.some((f) => f.getFleetID() === newFleetID)) {
      newFleetID = Math.random().toString(36).substring(2, 7);
    }

    const newFleet = new Fleet(userId, newFleetID);
    fleets.push(newFleet);
    return newFleet;
  };

  public getFleetByID: GetFleetByID = async (fleetId) => {
    return fleets.find((f) => f.getFleetID() === fleetId);
  };

  public getFleetsByUserID: GetFleetsByUserID = async (userId) => {
    return fleets.filter((f) => f.getUserID() === userId);
  };

  public updateVehicles: UpdateVehicles = async (fleetId, vehicles) => {
    const matchingFleet = fleets.find((f) => f.getFleetID() === fleetId);
    if (matchingFleet) matchingFleet.setVehicles(vehicles);
  };

  public localizeVehicle: LocalizeVehicle = async (
    fleetId,
    plateNumber,
    location
  ) => {
    const matchingFleet = fleets.find((f) => f.getFleetID() === fleetId);
    if (!matchingFleet) return undefined;
    const matchingVehicle = matchingFleet
      .getVehicles()
      .find((v) => v.getPlateNumber() === plateNumber);

    if (
      matchingVehicle &&
      !matchingVehicle.getLocation()?.isSameLocationAs(location)
    )
      matchingVehicle.park(location);
  };
}
