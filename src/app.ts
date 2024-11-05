import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js/driver";
import { DB_URL } from "./config";
import * as schema from "./schema";
import { sql } from "drizzle-orm";
import { Point } from "geojson";

(async () => {
  const client = postgres(DB_URL);
  try {
    const db = drizzle(client, { schema: { ...schema }, logger: false });

    // fetch one landmarks
    const landmark = await db
      .select({
        id: schema.landmarks.id,
        location:
          sql<Point>`ST_AsGeoJSON(${schema.landmarks.location})`.mapWith(
            (value) => JSON.parse(value) as Point
          ),
        location2:
          sql<Point>`ST_AsGeoJSON(${schema.landmarks.location2})`.mapWith(
            (v) => JSON.parse(v) as Point
          ),
      })
      .from(schema.landmarks)
      .limit(1);

    console.log(JSON.stringify(landmark));
  } catch (error) {
    console.error(error);
  } finally {
    await client.end();
  }
})();
