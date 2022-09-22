import { clearDB } from '../db/internalDB.js';
import { seedDBHandler } from './admin.js';
import { logger } from "../../src/logger.js";

export function setupRoutes(app) {
    app.post('/test/clear-db', (req, res) => {
        clearDB();
        res.send("success");
    });

    app.post('/test/reseed-db/:type', (req, res) => {
        logger.info(`[test/reseed-db/${req.params.type}] resetting DB with seed data`);
        clearDB();
        seedDBHandler(req, res);
    });
}
