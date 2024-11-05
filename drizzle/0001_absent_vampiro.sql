CREATE TABLE IF NOT EXISTS "landmarks" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"location" geometry(POINT, 4326)
);
