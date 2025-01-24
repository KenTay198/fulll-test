import { CreateFleetUseCase } from "../../../app/useCases/CreateFleetUseCase";
import { IFleetRepository } from "../../../domain/fleet/FleetRepository";

export const createCommand = async (
  repository: IFleetRepository,
  args: any[]
) => {
  const [userId] = args;
  if (!userId) return console.log("Please set your userId.");
  const fleetId = await new CreateFleetUseCase(repository).execute({
    userId,
  });
  console.log("Here is your fleet ID : " + fleetId);
};
