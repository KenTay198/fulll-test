import { Location } from "../vehicle/Location";
import { Vehicle } from "../vehicle/Vehicle";
import { Fleet } from "./Fleet";

export type CreateFleet = (userId: string) => Promise<Fleet>;

export type GetFleetByID = (fleetId: string) => Promise<Fleet | undefined>;

export type GetFleetsByUserID = (userId: string) => Promise<Fleet[]>;

export type UpdateVehicles = (
  fleetId: string,
  vehicles: Vehicle[]
) => Promise<void>;

export type ParkVehicle = (
  fleetId: string,
  vehicle: Vehicle
) => Promise<Fleet | undefined>;

export type LocalizeVehicle = (
  fleetId: string,
  plateNumber: string,
  location: Location
) => Promise<void>;

export interface IFleetRepository {
  getFleetByID: GetFleetByID;
  getFleetsByUserID: GetFleetsByUserID;
  createFleet: CreateFleet;
  updateVehicles: UpdateVehicles;
  localizeVehicle: LocalizeVehicle;
}
