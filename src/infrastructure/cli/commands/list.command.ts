import { GetFleetsByUserIDUseCase } from "../../../app/useCases/GetFleetsByUserIDUseCase";
import { IFleetRepository } from "../../../domain/fleet/FleetRepository";

export const listCommand = async (
  repository: IFleetRepository,
  args: any[]
) => {
  const [userId] = args;
  if(userId === undefined) return console.log("Please set your user ID.")
  const fleets = await new GetFleetsByUserIDUseCase(repository).execute({
    userId,
  });
  console.log(!fleets || fleets.length === 0 ? "This user has no fleets." : fleets);
};
