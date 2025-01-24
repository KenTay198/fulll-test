import { IFleetRepository } from "../../domain/fleet/FleetRepository";

interface CreateFleetParams {
  userId: string;
}

export class CreateFleetUseCase {
  constructor(private readonly fleetRepository: IFleetRepository) {}

  async execute(params: CreateFleetParams) {
    const { userId } = params;
    const fleet = await this.fleetRepository.createFleet(userId);
    return fleet.getFleetID();
  }
}
