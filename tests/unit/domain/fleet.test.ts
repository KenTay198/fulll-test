import { describe, expect, test } from "@jest/globals";
import { Vehicle } from "../../../src/domain/vehicle/Vehicle.js";
import { Fleet } from "../../../src/domain/fleet/Fleet.js";

describe("a fleet", () => {
  test("should be created", () => {
    const fleet = new Fleet("1", "1");
    expect(fleet.getVehicles()).toEqual([]);
  });

  test("can register a vehicle", () => {
    const fleet = new Fleet("1", "1");
    const vehicle = new Vehicle("car", "XYZ-012");
    fleet.registerVehicle(vehicle);
    expect(fleet.getUserID()).toBe("1");
    expect(fleet.getFleetID()).toBe("1");
    expect(fleet.getVehicles()).toEqual([new Vehicle("car", "XYZ-012")]);
  });

  test("cannot register twice the same vehicles", () => {
    const fleet = new Fleet("1", "1");
    const vehicle = new Vehicle("car", "XYZ-012");
    fleet.registerVehicle(vehicle);
    const twiceRegister = async () => fleet.registerVehicle(vehicle);
    expect(twiceRegister()).rejects.toThrow(
      "This vehicle is already in this fleet !"
    );
  });

  test("can set vehicles", () => {
    const fleet = new Fleet("1", "1");
    const vehicle1 = new Vehicle("car", "XYZ-012");
    const vehicle2 = new Vehicle("motocycle", "ABC-012");
    fleet.setVehicles([vehicle1, vehicle2]);
    expect(fleet.getVehicles()).toEqual([vehicle1, vehicle2]);
  });
});
