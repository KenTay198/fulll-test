import { Fleet, FleetDummy } from "../../../src/domain/fleet/Fleet";
import { CreateFleet } from "../../../src/domain/fleet/FleetRepository";
import { Vehicle, VehicleDummy } from "../../../src/domain/vehicle/Vehicle";

export class SharedContext {
  public createFleet: CreateFleet;
  public myFleet: Fleet;
  public vehicle: Vehicle;

  constructor() {
    this.createFleet = () => {
      throw "Not implemented";
    };
    this.myFleet = new FleetDummy();
    this.vehicle = new VehicleDummy();
  }

  reset() {
    this.createFleet = () => {
      throw "Not implemented";
    };
    this.myFleet = new FleetDummy();
    this.vehicle = new VehicleDummy();
  }
}

export const sharedContext = new SharedContext();
