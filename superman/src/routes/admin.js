import _ from "lodash";
import { addModelToInternalDB } from "../db/internalDB.js";
import { logger } from "../../src/logger.js";

import test from "../../seed_data/test.js";
import merchantConfig from "../../seed_data/merchantConfig.js";
import test_with_onboard from "../../seed_data/test_with_onboard.js";
import test_with_onboard_but_no_campaigns_or_rewards from "../../seed_data/test_with_onboard_but_no_campaigns_or_rewards.js";

// todo-graham:
// change location of these two funcs
export function seedDB(type) {
	logger.info(`[seedDB] putting data in DB for '${type}'`);

	let seedData = {
        merchantConfig,
		test,
        test_with_onboard,
        test_with_onboard_but_no_campaigns_or_rewards,
	};

	if (!_.has(seedData, type)) {
		throw `invalid seed data type: ${type}`;
	}

	let data = seedData[type];

	for (let modelName in data) {
		let models = data[modelName];
		_.forEach(models, function (modelData) {
			addModelToInternalDB(modelName, _.clone(modelData));
		});
	}
}

export function seedDBHandler(req, res) {
	const type = req.params.type;
	seedDB(type);
	res.send("success");
}

export function setupRoutes(app, getServers) {
    app.get('/admin/ping', (req, res) => {
        res.status(200).send("ding!");
    });

    // todo-graham: should be a post
	app.get("/admin/die", (req, res) => {
		logger.info(`[/admin/die] received die command`);
        let closedCounter = 0;

        _.forEach(getServers(), (server) => {
            // print the port of the closing server
            logger.info(`[/admin/die] closing this server: %s`, server._connectionKey);
            server.close(() => {
                closedCounter++;
                if (closedCounter == 1) {
                    // we send the response after we close the first server because we don't know if any
                    // other callback will run. I don't understand why this is. I am confused.
                    //
                    // sometimes, all callbacks run, and sometimes, they don't.
                    res.status(200).send("dying!");
                }
            });
        });
	});

	// :type should be the filename in /seed_data
	//
	// do not include the extension (.js)
	app.post("/admin/seed_data/:type", seedDBHandler);
}
