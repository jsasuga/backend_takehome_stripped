import express from "express";
import _ from "lodash";

import { loadDBFromFile } from "./src/db/internalDB.js";
import { setupRoutes } from "./src/routes/setupRoutes.js";
import { setupCORS } from "./src/cors.js";
import { seedDB } from "./src/routes/admin.js";
import { logger } from "./src/logger.js";
import "./src/languageSetup.js";
import { clearDB } from './src/db/internalDB.js';
import { listenToPort, killExistingSuperman } from "./src/listen.js";
import domainConfig  from "./src/domainConfig.js";

const app = express();
const port = 1938;

setupCORS(app);

// set up the DB - insert data, recover data
if (process.env.SEED_WITH_TEST_DATA == "true") {
    clearDB();
	seedDB("test");
} else {
    var dbThatWeLoaded = await loadDBFromFile();
    var dbIsEmpty = _.isEmpty(dbThatWeLoaded);

    if (dbIsEmpty) {
        logger.info("[app.js - boot] the DB is empty; inserting merchantConfig defaults into DB");
        seedDB("merchantConfig");
    }
}

// set up routes
var supermanServer;
await setupRoutes(app, () => {
	return [supermanServer];
});

//
// Listen
//

// this kill has to happen before any of the listens
await killExistingSuperman();
supermanServer = await listenToPort(app, port);

export default app;
