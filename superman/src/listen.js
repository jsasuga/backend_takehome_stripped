import { spawnSync } from "child_process";
import { logger } from "./logger.js";
import axios from "axios";

export async function killExistingSuperman() {
    logger.info('[killExistingSuperman] trying to kill existing server');

    var port = 1938;
    try {
        await axios({
            method: "get",
            url: `http://localhost:${port}/admin/die`,
            timeout: 1000,
        });
        logger.info('[killExistingSuperman] had to kill existing server');
    } catch (error) {
        // if axios fucks up, we don't care. that probably means that a server isn't running; that's
        // good.
        logger.info("[killExistingSuperman] tried to kill existing server; got this error: %s", error.toString());
    }
}

export async function listenToPort(app, port) {
	logger.info(`[listenToPort] trying to listen to port ${port}`);

	var server;

	const portTaken = await portIsTaken(port);
	if (portTaken) {
		logger.warn(`[listenToPort] given port=${port} was taken, will listen to port=${port + 1} instead...`);
		port = port + 1;
	}

	server = app
		.listen(port, () => {
			logger.info(`[listenToPort] listening on port ${port}`);
		})
		.on("error", function (error) {
			logger.info(`[listenToPort] failed to listen to port ${port}: ${error}`);
		});

	return server;
}

// portIsTaken returns true if a process is running on the given port locally
async function portIsTaken(port) {
	try {
		await axios.get("http://localhost:" + port);
	} catch (e) {
		// Nothing is running on that port
		if (e.message.includes(`ECONNREFUSED`)) {
			return false;
		}

		// HAP is running on that port but without a backend
		else if (e.message.includes(`Request failed with status code 503`)) {
			logger.warn(`[portIsTaken] HAProxy is running on port=${port}`);
			return true;
		} else {
			logger.warn(
				`[portIsTaken] got an error checking the port=${port} before startup but we dont know how to handle it: ${e.message}`
			);
			return true;
		}
	}
	// if axios returns something, that means something is running on the port, so its taken
	return true;
}
