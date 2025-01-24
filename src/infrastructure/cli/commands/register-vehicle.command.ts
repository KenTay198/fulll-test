import { RegisterVehicleUseCase } from "../../../app/useCases/RegisterVehicleUseCase";
import { IFleetRepository } from "../../../domain/fleet/FleetRepository";
import { VehicleType } from "../../../domain/vehicle/Vehicle";

export const registerVehicleCommand = async (
  repository: IFleetRepository,
  args: any[]
) => {
  const [fleetId, type, plateNumber] = args;
  if (!fleetId) return console.log("Please set your fleetId.");
  if (!type)
    return console.log(
      "Please set the vehicle type (car | truck | motocycle)."
    );
  if (!plateNumber) return console.log("Please set the vehicle plateNumber.");
  await new RegisterVehicleUseCase(repository).execute({
    fleetId,
    type: type as VehicleType,
    plateNumber,
  });
  console.log("Your vehicle has been registered !");
};
