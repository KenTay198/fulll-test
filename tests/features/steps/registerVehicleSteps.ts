import { Given, When, Then, Before } from "@cucumber/cucumber";
import assert from "assert";
import { Vehicle } from "../../../src/domain/vehicle/Vehicle";
import { FleetRepositoryStub } from "../../../src/infrastructure/persistence/repositories/FleetRepositoryStub";
import { IFleetRepository } from "../../../src/domain/fleet/FleetRepository";
import { sharedContext as shared } from "./shared";

Before(function () {
  const fleetRepository: IFleetRepository = new FleetRepositoryStub();
  this.updateVehicles = fleetRepository.updateVehicles;
  shared.createFleet = fleetRepository.createFleet.bind(fleetRepository);
});

Given("my fleet", async function () {
  const newFleet = await shared.createFleet("1");
  shared.myFleet = newFleet;
});

Given("the fleet of another user", async function () {
  const otherFleet = await shared.createFleet("2");
  this.otherFleet = otherFleet;
});

Given("a vehicle", async function () {
  shared.vehicle = new Vehicle("car", "ABC-123");
});

Given(
  "this vehicle has been registered into the other user's fleet",
  async function () {
    if (this.otherFleet.isVehicleRegistered(shared.vehicle)) return;
    this.otherFleet.registerVehicle(shared.vehicle);
    await this.updateVehicles(
      this.otherFleet.getFleetID(),
      this.otherFleet.getVehicles()
    );
  }
);

Given("I have registered this vehicle into my fleet", async function () {
  const { myFleet, vehicle } = shared;
  if (shared.myFleet.isVehicleRegistered(vehicle)) return;
  myFleet.registerVehicle(vehicle);
  await this.updateVehicles(myFleet.getFleetID(), myFleet.getVehicles());
});

When(/I (try to )?register this vehicle into my fleet/, async function (tryTo) {
  try {
    const { myFleet, vehicle } = shared;
    myFleet.registerVehicle(vehicle);
    await this.updateVehicles(myFleet.getFleetID(), myFleet.getVehicles());
  } catch (error: any) {
    if (tryTo) this.errorMessage = error.message;
  }
});

Then(
  "I should be informed that this vehicle has already been registered into my fleet",
  async function () {
    assert.equal(this.errorMessage, "This vehicle is already in this fleet !");
  }
);

Then("this vehicle should be part of my vehicle fleet", async function () {
  assert.equal(shared.myFleet.isVehicleRegistered(shared.vehicle), true);
});
