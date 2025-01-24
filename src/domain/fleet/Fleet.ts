import { Vehicle } from "../vehicle/Vehicle.js";

export class Fleet {
  private vehicles: Vehicle[] = [];

  constructor(private userId: string, private fleetId: string) {}

  public registerVehicle(vehicle: Vehicle) {
    if (this.isVehicleRegistered(vehicle)) {
      throw new Error("This vehicle is already in this fleet !");
    }

    this.vehicles.push(vehicle);
  }

  public isVehicleRegistered(vehicle: Vehicle) {
    return this.vehicles.some(
      (v) => v.getPlateNumber() === vehicle.getPlateNumber()
    );
  }

  public getUserID() {
    return this.userId;
  }

  public getFleetID() {
    return this.fleetId;
  }

  public getVehicles() {
    return this.vehicles;
  }

  public setVehicles(vehicles: Vehicle[]) {
    this.vehicles = vehicles;
  }
}

export class FleetDummy extends Fleet {
  constructor() {
    super("user-id", "fleet-id");
  }
}
