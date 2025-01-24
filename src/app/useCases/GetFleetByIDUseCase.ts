import { IFleetRepository } from "../../domain/fleet/FleetRepository";

interface GetFleetByIDParams {
  fleetId: string;
}

export class GetFleetByIDUseCase {
  constructor(private readonly fleetRepository: IFleetRepository) {}

  async execute(params: GetFleetByIDParams) {
    const { fleetId } = params;
    const fleets = this.fleetRepository.getFleetByID(fleetId);
    if(!fleets) throw new Error("No fleets has been found !")
    return fleets;
  }
}
