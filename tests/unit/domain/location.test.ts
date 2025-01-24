import { describe, expect, test } from "@jest/globals";
import { Location } from "../../../src/domain/vehicle/Location.js";

describe("a location", () => {
  test("should be created", () => {
    const location = new Location(12, 35, 20);
    expect(location.getLatitude()).toBe(12);
    expect(location.getLongitude()).toBe(35);
    expect(location.getAltitude()).toBe(20);
  });

  test("can be the same as another location", () => {
    const location1 = new Location(50, 50, 12);
    const location2 = new Location(50, 50, 12);
    expect(location1.isSameLocationAs(location2)).toBe(true);
  });
});
