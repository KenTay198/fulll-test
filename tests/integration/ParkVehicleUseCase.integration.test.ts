import { describe, expect, it } from "@jest/globals";
import { FleetRepositoryStub } from "../../src/infrastructure/persistence/repositories/FleetRepositoryStub";
import { ParkVehicleUseCase } from "../../src/app/useCases/ParkVehicleUseCase";
import { VehicleDummy } from "../../src/domain/vehicle/Vehicle";

describe("ParkVehicleUseCase Integration", () => {
  it("should park a vehicle", async () => {
    const repository = new FleetRepositoryStub();
    const newFleet = await repository.createFleet("1");
    const fleetId = newFleet.getFleetID();
    const vehicle = new VehicleDummy();

    newFleet.registerVehicle(vehicle);

    repository.updateVehicles(fleetId, newFleet.getVehicles());

    const useCase = new ParkVehicleUseCase(repository);

    await useCase.execute({
      fleetId,
      plateNumber: vehicle.getPlateNumber(),
      lat: 50.452,
      lon: 29.659,
      alt: 152,
    });

    const fleet = await repository.getFleetByID(fleetId);
    expect(fleet).toBeDefined();
    const matchingVehicle = fleet!
      .getVehicles()
      .find((e) => e.getPlateNumber() === vehicle.getPlateNumber());
    expect(matchingVehicle).toBeDefined();
    const location = matchingVehicle!.getLocation();
    expect(location).toBeDefined();
    const lat = location!.getLatitude();
    expect(lat).toBe(50.452);
    const lon = location!.getLongitude();
    expect(lon).toBe(29.659);
    const alt = location!.getAltitude();
    expect(alt).toBe(152);
  });
});
