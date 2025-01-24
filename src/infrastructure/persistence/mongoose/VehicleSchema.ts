import { Schema } from "mongoose";
import { VehicleType } from "../../../domain/vehicle/Vehicle";
import { ILocationDocument, LocationSchema } from "./LocationSchema";

interface IVehicleDocument {
  type: VehicleType;
  plateNumber: string;
  location?: ILocationDocument;
}

const VehicleSchema: Schema = new Schema(
  {
    type: {
      type: String,
      enum: ["car", "truck", "motocycle"],
      required: true,
    },
    plateNumber: {
      type: String,
      required: true,
    },
    location: {
      type: LocationSchema,
    },
  },
  { _id: false }
);

export { VehicleSchema, IVehicleDocument };
