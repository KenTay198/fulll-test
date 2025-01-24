import { IFleetRepository } from "../../domain/fleet/FleetRepository";

interface CreateFleetParams {
  userId: string;
}

export class CreateFleetUseCase {
  constructor(private readonly fleetRepository: IFleetRepository) {}

  async execute(params: CreateFleetParams) {
    return new Promise<string>((resolve, reject) => {
      const { userId } = params;
      this.fleetRepository
        .createFleet(userId)
        .then((fleet) => resolve(fleet.getFleetID()))
        .catch(reject);
    });
  }
}
