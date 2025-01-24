import { Location } from "./Location";

export type VehicleType = "car" | "truck" | "motocycle";

export class Vehicle {
  private location?: Location;
  constructor(private type: VehicleType, private plateNumber: string) {
    if (!["car", "truck", "motocycle"].includes(type))
      throw new Error("This vehicle type does not exists.");
  }

  park(location: Location) {
    if (this.location && this.location.isSameLocationAs(location)) {
      throw new Error("This vehicle is already parked there !");
    }

    this.location = location;
  }

  getType() {
    return this.type;
  }

  getPlateNumber() {
    return this.plateNumber;
  }

  getLocation() {
    return this.location;
  }
}

export class VehicleDummy extends Vehicle {
  constructor() {
    super("car", "plateNumber");
  }
}
