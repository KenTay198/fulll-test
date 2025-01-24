import mongoose, { Schema, Document } from "mongoose";
import { IVehicleDocument, VehicleSchema } from "./VehicleSchema";

interface IFleetDocument extends Document<string> {
  userId: string;
  vehicles: IVehicleDocument[];
}
const FleetSchema: Schema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    vehicles: {
      type: [VehicleSchema],
      required: true,
    },
  },
  { timestamps: true }
);

if (mongoose.models.Fleet) delete mongoose.models.Fleet;

const FleetModel = mongoose.model<IFleetDocument>("Fleet", FleetSchema);

export { FleetModel, IFleetDocument };
