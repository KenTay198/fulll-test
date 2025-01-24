import { ParkVehicleUseCase } from "../../../app/useCases/ParkVehicleUseCase";
import { IFleetRepository } from "../../../domain/fleet/FleetRepository";

export const parkCommand = async (
  repository: IFleetRepository,
  args: any[]
) => {
  const [fleetId, plateNumber, lat, lon, alt] = args;
  if (!fleetId) return console.log("Please set your fleetId.");
  if (!lat || !lon) return console.log("Please set the vehicle coordinates.");
  if (!plateNumber) return console.log("Please set the vehicle plateNumber.");
  await new ParkVehicleUseCase(repository).execute({
    fleetId,
    plateNumber,
    lat,
    lon,
    alt,
  });
  console.log("Your vehicle has been parked !");
};
