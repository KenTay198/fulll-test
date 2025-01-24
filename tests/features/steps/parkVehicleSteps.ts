import { Given, When, Then, Before } from "@cucumber/cucumber";
import assert from "assert";
import { FleetRepositoryStub } from "../../../src/infrastructure/persistence/repositories/FleetRepositoryStub";
import { IFleetRepository } from "../../../src/domain/fleet/FleetRepository";
import { Location } from "../../../src/domain/vehicle/Location";
import { sharedContext as shared } from "./shared";

Before(function () {
  const fleetRepository: IFleetRepository = new FleetRepositoryStub();
  this.localizeVehicle = fleetRepository.localizeVehicle;
});

Given("a location", async function () {
  this.location = new Location(50, 21);
});

Given("my vehicle has been parked into this location", async function () {
  const vehicleLocation = shared.vehicle.getLocation();
  if (vehicleLocation && vehicleLocation.isSameLocationAs(this.location))
    return;
  shared.vehicle.park(this.location);
  await this.localizeVehicle(
    shared.myFleet.getFleetID(),
    shared.vehicle.getPlateNumber(),
    this.location
  );
});

When(/I (try to )?park my vehicle at this location/, async function (tryTo) {
  try {
    shared.vehicle.park(this.location);
    await this.localizeVehicle(
      shared.myFleet.getFleetID(),
      shared.vehicle.getPlateNumber(),
      this.location
    );
  } catch (error: any) {
    if (tryTo) this.errorMessage = error.message;
  }
});

Then(
  "the known location of my vehicle should verify this location",
  async function () {
    assert.deepEqual(shared.vehicle.getLocation(), this.location);
  }
);

Then(
  "I should be informed that my vehicle is already parked at this location",
  async function () {
    assert.equal(this.errorMessage, "This vehicle is already parked there !");
  }
);
