import { IFleetRepository } from "../../domain/fleet/FleetRepository";

interface GetFleetsByUserIDParams {
  userId: string;
}

export class GetFleetsByUserIDUseCase {
  constructor(private readonly fleetRepository: IFleetRepository) {}

  async execute(params: GetFleetsByUserIDParams) {
    const { userId } = params;
    const fleets = this.fleetRepository.getFleetsByUserID(userId);    
    if (!fleets) throw new Error("No fleets has been found !");
    return fleets;
  }
}
