import { GetFleetsByUserIDUseCase } from "../../../app/useCases/GetFleetsByUserIDUseCase";
import { IFleetRepository } from "../../../domain/fleet/FleetRepository";

export const listCommand = async (
  repository: IFleetRepository,
  args: any[]
) => {
  const [userId] = args;
  const fleet = await new GetFleetsByUserIDUseCase(repository).execute({
    userId,
  });
  console.log(fleet || "No fleet has been found for this user.");
};
