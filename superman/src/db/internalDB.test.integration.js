import fs from "fs";
import _ from "lodash";
import {
	addModelToInternalDB,
	updateModelInInternalDB,
	getInternalDB,
	clearDB,
	loadDBFromFile,
} from "./internalDB.js";
import { writeDBToFile, createPersister, getMostRecentFileName } from "./persister.js";
import { logger } from "../logger.js";

// TEST_SAVE_DIR is where data is saved for this set of tests
// because of the nature of the persistence system always reading the latest files this dir should not be shared with other tests
const TEST_SAVE_DIR = "./src/testdata/internalDBTestdata";
const TEST_DB_RECOVERY_SAVE_DIR = "./src/testdata/internalDBTestdata_DBRecovery";

function delay(time) {
	return new Promise((resolve) => setTimeout(resolve, time));
}

test("addModelToInternalDB persists what was passed in", async () => {
	createPersister(TEST_SAVE_DIR);

	const obj = {
		wasSavedByInternalDBTest: true,
	};
	addModelToInternalDB(`createTest_obj`, obj);

	// this is a hack to fix a race -- we need to wait on the async persist to flush to disk
	await delay(100);

	// now read the file and check it's what we have
	const latestFilename = await getMostRecentFileName(TEST_SAVE_DIR);
	logger.info("latestFilename: %s", latestFilename);

	// read the file that internalDB saved to, get the modelID and check if the contents are the same as what we sent in
	const persistedFile = fs.readFileSync(latestFilename);
	const JSONFileData = JSON.parse(persistedFile);
	const modelID = JSONFileData.createTest_obj[Object.keys(JSONFileData.createTest_obj)]["id"];

	if (!_.has(JSONFileData.createTest_obj[modelID], "wasSavedByInternalDBTest")) {
		throw `expected read file data to have an object with a field called "wasSavedByInternalDBTest"`;
	}

	if (!JSONFileData.createTest_obj[modelID]["wasSavedByInternalDBTest"]) {
		throw `expected read file data "wasSavedByInternalDBTest" to equal "true"`;
	}
});

test("updateModelInInternalDB persists what was passed in and overwrites the old state", async () => {
	createPersister(TEST_SAVE_DIR);

	if (!fs.existsSync(TEST_SAVE_DIR)) {
		fs.mkdirSync(TEST_SAVE_DIR);
	}

	const obj = {
		wasSavedByInternalDBTest: true,
	};
	addModelToInternalDB(`updateTest_obj`, obj);

	// this is a hack to fix a race -- we need to wait on the async persist to flush to disk
	await delay(100);

	// now read the file and check it's what we have
	const firstLatestFilename = await getMostRecentFileName(TEST_SAVE_DIR);
	logger.info("firstLatestFilename: %s", firstLatestFilename);

	// read the file that internalDB saved to, get the modelID and check if the contents are the same as what we sent in
	const persistedFile = fs.readFileSync(firstLatestFilename);
	const JSONFileData = JSON.parse(persistedFile);
	logger.info("JSONFileData=%s", JSON.stringify(JSONFileData));

	const modelID = JSONFileData.updateTest_obj[Object.keys(JSONFileData.updateTest_obj)]["id"];

	if (!_.has(JSONFileData.updateTest_obj[modelID], "wasSavedByInternalDBTest")) {
		throw `expected read file data to have an object with a field called "wasSavedByInternalDBTest"`;
	}

	if (!JSONFileData.updateTest_obj[modelID]["wasSavedByInternalDBTest"]) {
		throw `expected read file data "wasSavedByInternalDBTest" to equal "true"`;
	}

	// now run the update and confirm the field changes
	const updatedObj = {
		updatedToThis: true,
	};

	updateModelInInternalDB(`updateTest_obj`, modelID, updatedObj);

	// this is a hack to fix a race -- we need to wait on the async persist to flush to disk
	await delay(100);

	const newLatestFilename = await getMostRecentFileName(TEST_SAVE_DIR);

	if (newLatestFilename === firstLatestFilename) {
		throw `expected a new file to be created with the update call but its the same`;
	}

	let newPersistedFile = fs.readFileSync(newLatestFilename);
	let newJSONFileData = JSON.parse(newPersistedFile);

	// it should have the new field
	if (!_.has(newJSONFileData.updateTest_obj[modelID], "updatedToThis")) {
		throw `expected updated object to have with a field called "updatedToThis"`;
	}

	// but it also should not have the old field
	if (_.has(newJSONFileData.updateTest_obj[modelID], "wasSavedByInternalDBTest")) {
		throw `expected updated object to not have old field called "wasSavedByInternalDBTest"`;
	}

	// and the new field should be correct
	if (!newJSONFileData.updateTest_obj[modelID]["updatedToThis"]) {
		throw `expected updated field "updatedToThis" to equal "true"`;
	}

	// if the old file exists, the delete didn't work and that's an error
	if (fs.existsSync(firstLatestFilename)) {
		throw `${firstLatestFilename} should have been deleted but wasn't`;
	}
});

test("recoverOrSetupDB sets to empty if theres no DB to recover from", async () => {
	createPersister(TEST_DB_RECOVERY_SAVE_DIR);
	clearDB(); // previous tests will have put stuff in here and we don't want that

	if (!_.isEmpty(getInternalDB())) {
		throw `internalDB should be empty before attempting recovery`;
	}

	await loadDBFromFile();

	if (!_.isEmpty(getInternalDB())) {
		throw `internalDB should be empty after attempting recovery`;
	}
});

// seedWithFile creates a file using the persister and returns the
async function seedWithFile() {
	return await writeDBToFile({ wasRecovered: true });
}

test("recoverOrSetupDB recovers from latest DB file when only one file exists", async () => {
	createPersister(TEST_DB_RECOVERY_SAVE_DIR);
	clearDB(); // previous tests will have put stuff in here and we don't want that

	if (!_.isEmpty(getInternalDB())) {
		throw `internalDB should be empty before attempting recovery`;
	}

	let onlyFile = await seedWithFile(); // create a file to recover from
	await delay(100); // wait for disk flush
	let recoveryFile = await loadDBFromFile();
	await delay(100); // wait for disk flush

	if (_.isEmpty(getInternalDB())) {
		throw `internalDB should be NOT empty after recovering from one file`;
	}

	if (recoveryFile !== onlyFile) {
		logger.error(`one file recovery: recoveryFile=%s onlyFile=%s`, recoveryFile, onlyFile);
		throw `internalDB should have recovered from the newer file and NOT the older one`;
	}

	// clean up after ourselves
	await fs.unlinkSync(onlyFile);
	await delay(100);
	clearDB();
});

test("recoverOrSetupDB recovers from latest DB file when two files exist", async () => {
	createPersister(TEST_DB_RECOVERY_SAVE_DIR);
	clearDB(); // previous tests will have put stuff in here and we don't want that

	if (!_.isEmpty(getInternalDB())) {
		throw `internalDB should be empty before attempting recovery`;
	}

	// now create two files and make sure we recover from the second one (the most recent one)
	let olderFile = await seedWithFile();
	await delay(10); // ensure we dont race on the ms filename
	let newerFile = await seedWithFile();
	await delay(100); // wait for disk flush

	let recoveryFile = await loadDBFromFile();
	await delay(100); // wait for disk flush

	if (_.isEmpty(getInternalDB())) {
		throw `internalDB should be NOT empty after recovering from one file`;
	}

	if (recoveryFile !== newerFile) {
		logger.error(`two file recovery: recoveryFile=%s newerFile=%s olderFile=%s`, recoveryFile, newerFile, olderFile);
		throw `internalDB should have recovered from the newer file and NOT the older one`;
	}

	// clean up after ourselves
	await fs.unlinkSync(newerFile);
	await delay(100);
	clearDB();
});

test("recoverOrSetupDB recovers from latest DB file when more than three files exist", async () => {
	createPersister(TEST_DB_RECOVERY_SAVE_DIR);
	clearDB(); // previous tests will have put stuff in here and we don't want that

	if (!_.isEmpty(getInternalDB())) {
		throw `internalDB should be empty before attempting recovery`;
	}

	// now create two files and make sure we recover from the second one (the most recent one)
	let olderFile = await seedWithFile();
	await delay(10); // ensure we dont race on the ms filename
	let newerFile = await seedWithFile();
	await delay(100); // wait for disk flush
	let newestFile = await seedWithFile();
	await delay(100); // wait for disk flush

	let recoveryFile = await loadDBFromFile();
	await delay(100); // wait for disk flush

	if (_.isEmpty(getInternalDB())) {
		throw `internalDB should be NOT empty after recovering from one file`;
	}

	if (recoveryFile !== newestFile) {
		logger.error(
			`two file recovery: recoveryFile=%s newestFile=%s newerFile=%s olderFile=%s`,
			recoveryFile,
			newestFile,
			newerFile,
			olderFile
		);
		throw `internalDB should have recovered from the newer file and NOT the older one`;
	}

	// clean up after ourselves
	await fs.unlinkSync(newestFile);
	await delay(100);
	clearDB();
});
