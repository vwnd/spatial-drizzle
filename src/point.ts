import { sql } from "drizzle-orm";
import { customType } from "drizzle-orm/pg-core";
import { Point } from "geojson";

export const pointz = customType<{ data: Point }>({
  dataType() {
    return `geometry(PointZ, 4326)`;
  },

  toDriver(value) {
    return sql`ST_SetSRID(ST_GeomFromGeoJSON(${JSON.stringify(value)}), 4326)`;
  },

  /**
   * Would be really cool to this. But it's not possible yet. https://github.com/drizzle-team/drizzle-orm/pull/1423
   */
  // fromDriver(value) {
  //   return sql<Point>`ST_AsGeoJSON(${schema.landmarks.location2})`
  // },
});
