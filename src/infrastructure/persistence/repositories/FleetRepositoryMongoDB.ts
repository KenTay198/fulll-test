import { Fleet } from "../../../domain/fleet/Fleet";
import {
  CreateFleet,
  GetFleetByID,
  GetFleetsByUserID,
  IFleetRepository,
  LocalizeVehicle,
  UpdateVehicles,
} from "../../../domain/fleet/FleetRepository";
import { Location } from "../../../domain/vehicle/Location";
import { Vehicle } from "../../../domain/vehicle/Vehicle";
import { connectMongoDB } from "../connections/mongo";
import { FleetModel, IFleetDocument } from "../mongoose/FleetModel";

export class FleetRepositoryDB implements IFleetRepository {
  private dbInitialized = false;

  constructor() {
    connectMongoDB().then(() => (this.dbInitialized = true));
  }

  public builder = async (method: () => void) => {
    if (!this.dbInitialized) throw "Database is not initialized yet.";
    method();
  };

  private formatFleet = ({ userId, _id, vehicles }: IFleetDocument) => {
    const newFleet = new Fleet(userId, _id.toString());

    for (const v of vehicles) {
      const vehicle: Vehicle = new Vehicle(v.type, v.plateNumber);
      if (v.location) {
        const { lat, lon, alt } = v.location;
        const location = new Location(lat, lon, alt);
        vehicle.park(location);
      }
      newFleet.registerVehicle(vehicle);
    }

    return newFleet;
  };

  public getFleetsByUserID: GetFleetsByUserID = async (userId) =>
    new Promise((resolve, reject) => {
      this.builder(() => {
        FleetModel.find({ userId })
          .then((res: IFleetDocument[]) => {
            resolve(res.map((e) => this.formatFleet(e)));
          })
          .catch(reject);
      }).catch(reject);
    });

  public getFleetByID: GetFleetByID = async (fleetId) =>
    new Promise((resolve, reject) => {
      this.builder(() => {
        FleetModel.findOne({ _id: fleetId })
          .lean()
          .then((res) => {
            if (!res) return resolve(undefined);
            resolve(this.formatFleet(res));
          })
          .catch(reject);
      }).catch(reject);
    });

  public createFleet: CreateFleet = async (userId) =>
    new Promise((resolve, reject) => {
      this.builder(() => {
        const newFleet = new FleetModel({ userId });
        newFleet
          .save()
          .then((res: IFleetDocument) => {
            resolve(new Fleet(userId, res._id));
          })
          .catch(reject);
      }).catch(reject);
    });

  public updateVehicles: UpdateVehicles = async (fleetId, vehicle) =>
    new Promise((resolve, reject) => {
      this.builder(() => {
        FleetModel.updateOne({ _id: fleetId }, { $push: { vehicles: vehicle } })
          .then(() => resolve())
          .catch(reject);
      }).catch(reject);
    });

  public localizeVehicle: LocalizeVehicle = async (
    fleetId,
    plateNumber,
    location
  ) =>
    new Promise((resolve, reject) => {
      this.builder(() => {
        FleetModel.updateOne(
          { _id: fleetId, "vehicles.plateNumber": plateNumber },
          { $set: { "vehicles.$[].location": location } },
          { upsert: true }
        )
          .then((res) => {
            const { matchedCount, upsertedCount } = res;
            if (matchedCount === 0)
              return reject("This vehicle does not exists.");
            if (upsertedCount) return reject("The vehicle couldn't be parked.");
            resolve();
          })
          .catch(reject);
      }).catch(reject);
    });
}
