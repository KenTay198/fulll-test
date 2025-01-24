import { Schema } from "mongoose";

interface ILocationDocument {
  lat: number;
  lon: number;
  alt?: number;
}

const LocationSchema: Schema = new Schema(
  {
    lat: {
      type: Number,
      required: true,
    },
    lon: {
      type: Number,
      required: true,
    },
    alt: {
      type: Number,
    },
  },
  { _id: false }
);

export { LocationSchema, ILocationDocument };
