import { IFleetRepository } from "../../domain/fleet/FleetRepository";
import { Vehicle, VehicleType } from "../../domain/vehicle/Vehicle";

interface RegisterVehicleParams {
  fleetId: string;
  type: VehicleType;
  plateNumber: string;
}

export class RegisterVehicleUseCase {
  constructor(private readonly fleetRepository: IFleetRepository) {}

  async execute(params: RegisterVehicleParams) {
    const { fleetId, type, plateNumber } = params;

    const fleet = await this.fleetRepository.getFleetByID(fleetId);
    if (!fleet) throw new Error("No fleet has been found.");

    const vehicle = new Vehicle(type, plateNumber);
    fleet.registerVehicle(vehicle);

    this.fleetRepository.updateVehicles(fleetId, fleet.getVehicles());
  }
}
