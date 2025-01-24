import { GetFleetByIDUseCase } from "../../../app/useCases/GetFleetByIDUseCase";
import { IFleetRepository } from "../../../domain/fleet/FleetRepository";

export const showCommand = async (
  repository: IFleetRepository,
  args: any[]
) => {
  const [fleetId] = args;
  const fleet = await new GetFleetByIDUseCase(repository).execute({
    fleetId,
  });
  console.log(fleet || "No fleet has been found with this ID.");
};
