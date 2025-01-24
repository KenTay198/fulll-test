import { describe, expect, it } from "@jest/globals";
import { FleetRepositoryStub } from "../../src/infrastructure/persistence/repositories/FleetRepositoryStub";
import { RegisterVehicleUseCase } from "../../src/app/useCases/RegisterVehicleUseCase";
import { Vehicle } from "../../src/domain/vehicle/Vehicle";

describe("RegisterVehicleUseCase Integration", () => {
  it("should register a vehicle into a fleet", async () => {
    const repository = new FleetRepositoryStub();
    const fleetId = (await repository.createFleet("1")).getFleetID();

    const useCase = new RegisterVehicleUseCase(repository);

    await useCase.execute({
      fleetId,
      type: "car",
      plateNumber: "XYZ-123",
    });

    const fleet = await repository.getFleetByID(fleetId);
    expect(fleet).toBeDefined();
    const vehicles = fleet!.getVehicles();
    expect(vehicles).toHaveLength(1);
    expect(vehicles[0]).toEqual(new Vehicle("car", "XYZ-123"));
  });
});
