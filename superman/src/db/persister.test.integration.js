import _ from "lodash";
import { readFileSync } from "fs";
import { createPersister, writeDBToFile } from "./persister.js";
import { logger } from "../logger.js";

// TEST_SAVE_DIR is where data is saved for this set of tests
// because of the nature of the persistence system always reading the latest files this dir should not be shared with other tests
const TEST_SAVE_DIR = "./src/testdata/persisterTestdata";

// delay sleeps for time milliseconds
function delay(time) {
	return new Promise((resolve) => setTimeout(resolve, time));
}

test("persister saves what was passed in", async () => {
    createPersister(TEST_SAVE_DIR);

	const obj = {
		wasSavedByPersistObject: true,
	};

	const savePath = await writeDBToFile(obj);

	// this is a hack to fix a race -- we need to wait on the async persist to flush to disk
	await delay(250);

	// now read the file and check it's what we have
	const persistedFile = readFileSync(savePath);
	const JSONFileData = JSON.parse(persistedFile);

	logger.info("JSONFileData=%s", persistedFile);

	if (!_.has(JSONFileData, "wasSavedByPersistObject")) {
		logger.error(
			`expected read file data to have an object with a field called "wasSavedByPersistObject" -- but it didn't. Read JSON file data: ${JSONFileData}`
		);
		// delete the file so that we don't pollute this
		throw `expected read file data to have an object with a field called "wasSavedByPersistObject" -- but it didn't. See error logs`;
	}

	if (!JSONFileData.wasSavedByPersistObject) {
		logger.error(`expected read file data "wasSavedByPersistObject" to equal "true" -- but it wasn't: ${JSONFileData}`);
		throw `expected read file data "wasSavedByPersistObject" to equal "true" -- but it wasn't. See error logs`;
	}
});
