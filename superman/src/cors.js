import express from "express";
import cors from "cors";

export function setupCORS(app) {
	// parse request bodies as JSON
	app.use(express.json({ limit: "50mb" }));
	app.use(express.urlencoded({ limit: "50mb" }));

	// set cors security
	app.use(
		cors({
			origin: "*",
		})
	);
	app.options("*", cors());
}
