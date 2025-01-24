import { describe, expect, it } from "@jest/globals";
import { FleetRepositoryStub } from "../../src/infrastructure/persistence/repositories/FleetRepositoryStub";
import { GetFleetsByUserIDUseCase } from "../../src/app/useCases/GetFleetsByUserIDUseCase";
import { Vehicle } from "../../src/domain/vehicle/Vehicle";

describe("GetFleetsByUserIDUseCase Integration", () => {
  it("should retrieve all fleets from a user", async () => {
    const repository = new FleetRepositoryStub();
    const vehicle1 = new Vehicle("car", "ABC");
    const vehicle2 = new Vehicle("truck", "XYZ");

    const f1 = await repository.createFleet("1");
    const f2 = await repository.createFleet("1");
    f1.registerVehicle(vehicle1);
    f2.registerVehicle(vehicle2);
    await repository.updateVehicles(f1.getFleetID(), f1.getVehicles());
    await repository.updateVehicles(f2.getFleetID(), f2.getVehicles());

    const useCase = new GetFleetsByUserIDUseCase(repository);
    const fleets = await useCase.execute({
      userId: "1",
    });

    expect(fleets).toBeDefined();
    expect(fleets).toHaveLength(2);

    const [fleet1, fleet2] = fleets;
    for (const fleet of fleets) {
      expect(typeof fleet.getFleetID()).toBe("string");
      expect(fleet.getUserID()).toEqual("1");
    }
    expect(fleet1.getFleetID()).not.toEqual(fleet2.getFleetID());
    expect(fleet1.getVehicles()).toEqual([vehicle1]);
    expect(fleet2.getVehicles()).toEqual([vehicle2]);
  });
});
