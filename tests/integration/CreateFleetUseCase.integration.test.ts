import { describe, expect, it } from "@jest/globals";
import { FleetRepositoryStub } from "../../src/infrastructure/persistence/repositories/FleetRepositoryStub";
import { CreateFleetUseCase } from "../../src/app/useCases/CreateFleetUseCase";

describe("CreateFleetUseCase Integration", () => {
  it("should create a fleet", async () => {
    const repository = new FleetRepositoryStub();
    const useCase = new CreateFleetUseCase(repository);

    const fleetId = await useCase.execute({
      userId: "1",
    });

    const fleet = await repository.getFleetByID(fleetId);
    expect(fleet).toBeDefined();
    expect(fleet!.getUserID()).toEqual("1");
    expect(fleet!.getFleetID()).toEqual(fleetId);
    expect(fleet!.getVehicles()).toHaveLength(0);
  });
});
