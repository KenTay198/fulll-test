import { describe, expect, test } from "@jest/globals";
import { Vehicle, VehicleDummy } from "../../../src/domain/vehicle/Vehicle.js";
import { Location } from "../../../src/domain/vehicle/Location.js";

describe("a vehicle", () => {
  test("should be created", () => {
    const vehicle = new Vehicle("car", "XYZ-012");
    expect(vehicle.getType()).toBe("car");
    expect(vehicle.getPlateNumber()).toBe("XYZ-012");
  });

  test("should not be anything else than a car, truck or motocycle", () => {
    //@ts-expect-error - Verify thrown error if case of incorrect vehicle type
    const vehicleCreation = async () => new Vehicle("skateboard", "XYZ-012");
    expect(vehicleCreation).rejects.toThrow(
      "This vehicle type does not exists."
    );
  });

  test("can park", () => {
    const vehicle = new Vehicle("car", "XYZ-012");
    const location = new Location(50, 50, 12);
    vehicle.park(location);
    expect(vehicle.getLocation()?.isSameLocationAs(location)).toBe(true);
  });

  test("can park elsewhere", () => {
    const vehicle = new VehicleDummy();
    const location = new Location(50, 50, 12);
    vehicle.park(location);
    const newLocation = new Location(50, 32, 98);
    vehicle.park(newLocation);
    expect(vehicle.getLocation()?.isSameLocationAs(newLocation)).toBe(true);
  });

  test("cannot park twice in a row at the same location", () => {
    const vehicle = new VehicleDummy();
    const location = new Location(50, 50, 12);
    vehicle.park(location);
    const twicePark = async () => vehicle.park(location);
    expect(twicePark).rejects.toThrow("This vehicle is already parked there !");
  });
});
