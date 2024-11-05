import { geometry, pgTable, serial, text } from "drizzle-orm/pg-core";
import { pointz } from "./types/pointz";

export const landmarks = pgTable("landmarks", {
  id: serial("id").primaryKey(),
  name: text("name"),
  location: geometry("location", { type: "point", mode: "xy", srid: 4326 }),
  location2: pointz("location2"),
});
