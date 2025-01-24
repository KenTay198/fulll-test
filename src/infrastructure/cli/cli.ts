import readline from "readline";
import { CreateFleetUseCase } from "../../app/useCases/CreateFleetUseCase";
import { RegisterVehicleUseCase } from "../../app/useCases/RegisterVehicleUseCase";
import { VehicleType } from "../../domain/vehicle/Vehicle";
import { ParkVehicleUseCase } from "../../app/useCases/ParkVehicleUseCase";
import { GetFleetByIDUseCase } from "../../app/useCases/GetFleetByIDUseCase";
import { GetFleetsByUserIDUseCase } from "../../app/useCases/GetFleetsByUserIDUseCase";
import { FleetRepositoryDB } from "../persistence/repositories/FleetRepositoryMongoDB";

const repository = new FleetRepositoryDB();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "fleet-cli> ",
});

console.log('Welcome to Fleet CLI. Type "help" to see available commands.');
rl.prompt();

rl.on("line", async (line) => {
  const [command, ...args] = line.trim().split(/\s+/);

  try {
    switch (command) {
      case "show": {
        const [fleetId] = args;
        const fleet = await new GetFleetByIDUseCase(repository).execute({
          fleetId,
        });
        console.log(fleet || "No fleet has been found with this ID.");
        break;
      }
      case "list": {
        const [userId] = args;
        const fleet = await new GetFleetsByUserIDUseCase(repository).execute({
          userId,
        });
        console.log(fleet || "No fleet has been found for this user.");
        break;
      }
      case "create": {
        const [userId] = args;
        if (!userId) return console.log("Please set your userId.");
        const fleetId = await new CreateFleetUseCase(repository).execute({
          userId,
        });
        console.log("Here is your fleet ID : " + fleetId);
        break;
      }
      case "register-vehicle": {
        const [fleetId, type, plateNumber] = args;
        if (!fleetId) return console.log("Please set your fleetId.");
        if (!type)
          return console.log(
            "Please set the vehicle type (car | truck | motocycle)."
          );
        if (!plateNumber)
          return console.log("Please set the vehicle plateNumber.");
        await new RegisterVehicleUseCase(repository).execute({
          fleetId,
          type: type as VehicleType,
          plateNumber,
        });
        console.log("Your vehicle has been registered !");
        break;
      }
      case "park": {
        const [fleetId, plateNumber, lat, lon, alt] = args;
        if (!fleetId) return console.log("Please set your fleetId.");
        if (!lat || !lon)
          return console.log("Please set the vehicle coordinates.");
        if (!plateNumber)
          return console.log("Please set the vehicle plateNumber.");
        await new ParkVehicleUseCase(repository).execute({
          fleetId,
          plateNumber,
          lat,
          lon,
          alt,
        });
        console.log("Your vehicle has been parked !");
        break;
      }
      case "exit":
        console.log("Exiting Fleet CLI...");
        rl.close();
        break;
      case "help":
        console.log("Available commands:");
        console.log(
          "  create <userId>                                                        - Create a new fleet for this user"
        );
        console.log(
          "  list <userId>                                                          - Show fleets by user"
        );
        console.log(
          "  show <fleetId>                                                         - Show a fleet"
        );
        console.log(
          "  register-vehicle <fleetId> <type (car|truck|motocycle)> <plateNumber>  - Register a new vehicle"
        );
        console.log(
          "  park <fleetId> <plateNumber> lat lon [alt]                  - Park a vehicle at a location"
        );
        console.log(
          "  exit                                                                   - Exit Fleet CLI"
        );
        break;
      default:
        console.log(
          `Unknown command: ${command}. Type "help" for available commands.`
        );
    }
  } catch (error: any) {
    const errorMessage = typeof error === "string" ? error : error.message;
    console.error(`Error : ${errorMessage}`);
  }

  rl.prompt();
});

rl.on("close", () => {
  console.log("Goodbye !");
  process.exit(0);
});
