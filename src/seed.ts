import postgres from "postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js/driver";
import * as schema from "./schema";
import { DB_URL } from "./config";

(async () => {
  // Migrations
  const migrationClient = postgres(DB_URL, { max: 1 });
  await migrate(drizzle(migrationClient), { migrationsFolder: "./drizzle" });
  await migrationClient.end();

  const client = postgres(DB_URL, { max: 1 });
  try {
    // Seed data
    const db = drizzle(client, { schema: { ...schema } });

    await db.delete(schema.landmarks);

    const point: GeoJSON.Point = {
      type: "Point",
      coordinates: [-74.0445, 40.6892, 10], // allows for z coordinate
    };

    await db.insert(schema.landmarks).values([
      {
        name: "Statue of Liberty",
        location: { x: -74.0445, y: 40.6892 },
        location2: point,
      },
    ]);
  } catch (error) {
    console.error(error);
  } finally {
    await client.end();
  }
})();
