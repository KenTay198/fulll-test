import readline from "readline";
import { FleetRepositoryDB } from "../persistence/repositories/FleetRepositoryMongoDB";
import { showCommand } from "./commands/show.command";
import { listCommand } from "./commands/list.command";
import { createCommand } from "./commands/create.command";
import { registerVehicleCommand } from "./commands/register-vehicle.command";
import { parkCommand } from "./commands/park.command";
import { helpCommand } from "./commands/help.command";

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
      case "show":
        await showCommand(repository, args);
        break;
      case "list":
        await listCommand(repository, args);
        break;
      case "create":
        await createCommand(repository, args);
        break;
      case "register-vehicle":
        await registerVehicleCommand(repository, args);
        break;
      case "park":
        await parkCommand(repository, args);
        break;
      case "exit":
        console.log("Exiting Fleet CLI...");
        rl.close();
        break;
      case "help":
        helpCommand();
        break;
      default:
        console.log(
          `Unknown command: ${command}. Type "help" for available commands.`
        );
    }
  } catch (error: any) {
    const errorMessage = error.message || error.toString();
    console.error(`Error : ${errorMessage}`);
  }

  rl.prompt();
});

rl.on("close", () => {
  console.log("Goodbye !");
  process.exit(0);
});
