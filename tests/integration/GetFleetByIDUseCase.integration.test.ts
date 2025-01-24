import { describe, expect, it } from "@jest/globals";
import { FleetRepositoryStub } from "../../src/infrastructure/persistence/repositories/FleetRepositoryStub";
import { GetFleetByIDUseCase } from "../../src/app/useCases/GetFleetByIDUseCase";

describe("GetFleetByIDUseCase Integration", () => {
  it("should retrieve a fleet", async () => {
    const repository = new FleetRepositoryStub();
    const fleetId = (await repository.createFleet("1")).getFleetID();

    const useCase = new GetFleetByIDUseCase(repository);
    const fleet = await useCase.execute({
      fleetId,
    });

    expect(fleet).toBeDefined();
    expect(fleet!.getUserID()).toEqual("1");
    expect(typeof fleet!.getFleetID()).toBe("string");
  });
});
