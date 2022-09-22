import _ from "lodash";
import path from "path";
import { logger } from "../logger.js";
import { readFileSync, writeFileSync, readdirSync, unlinkSync, mkdirSync, existsSync } from "fs";
import { Mutex } from "async-mutex";

// PROD_DB_DIR is where data is saved in prod
const PROD_DB_DIR = "./db";
const mutex = new Mutex();

// persister is the current persister implementation
var persister;

// createPersister sets the global persister implementation
export function createPersister(saveDir) {
	persister = newPersister(saveDir);
}

createPersister(PROD_DB_DIR);

// writeDBToFile persists obj to a file in the background
export async function writeDBToFile(obj) {
	return persister.saveDataAndDeleteOld(obj);
}

// newPersister creates a new persister that writes data to saveDir. it will create saveDir if it doesn't exist, otherwise it will use it
export function newPersister(saveDir) {
	let p = {};
	p.saveDir = saveDir;
	p.saveDataAndDeleteOld = function (obj) {
		return saveDataAndDeleteOld(obj, { saveDir: p.saveDir });
	};

	// create the directory if it doesn't exist because we need to save in it later
	if (!existsSync(p.saveDir)) {
		try {
			mkdirSync(p.saveDir, { recursive: true });
		} catch (e) {
			throw `error creating persister directories: ${e.message}`;
		}
	}
	return p;
}

// saveData write an object to a file (to the saveDir specified in persistConfig)
export async function saveData(obj, persistConfig) {
	if (_.isEmpty(persistConfig)) {
		throw new Error(`saveData: persistConfig cannot be empty`);
	}

	if (!_.has(persistConfig, "saveDir")) {
		throw new Error(`saveData: saveDir cannot be empty`);
	}

	const filename = `${_.now()}.json`;
	const savePath = path.join(persistConfig.saveDir, filename);

	// write in the background
	writeFileSync(savePath, JSON.stringify(obj));

	logger.info("persisted object to %s", savePath);
	return savePath;
}

// saveDataAndDeleteOld writes an object to a file and deletes the previous file
export async function saveDataAndDeleteOld(obj, persistConfig) {
	var filepathAfterUpdate;
	await mutex.runExclusive(async () => {
		// on the first write, the dir will be empty. We want to handle that case
		try {
			var filepathBeforeUpdate = getMostRecentFileName(persistConfig.saveDir);
		} catch (e) {
			// if the dir is empty, this doesn't affect us saving the data
			if (e.message.includes(`dir is empty`)) {
				// use this as a flag not to do delete since there's nothing to delete
				filepathBeforeUpdate = "";
			}
		}

		// we need to make sure the new data gets saved before we delete the old file
		filepathAfterUpdate = await saveData(obj, persistConfig);

		// if there was a previous file, delete it after update
		if (filepathBeforeUpdate.length > 0) {
			try {
				logger.info(`deleting old file: ${filepathBeforeUpdate}`);
				unlinkSync(filepathBeforeUpdate);
			} catch (e) {
				// we cant delete something that doesn't exist -- maybe it was already deleted
				if (e.message.includes(`no such file`)) {
					return filepathAfterUpdate;
				} else {
					throw `deleting old database file failed, filepath=${filepathBeforeUpdate}. Error: ${e.message}`;
				}
			}
		}
	});
	return filepathAfterUpdate;
}

export function deleteLatestFile() {
    var latestFile = getMostRecentFileNameSafely(persister.saveDir);
    if (latestFile != null) {
        unlinkSync(latestFile);
    }
}

function getMostRecentFileNameSafely(dir) {
    const files = readdirSync(dir);
    if (files.length === 0) {
        return null;
    }

    const latestFile = _.max(files);
    return path.join(dir, latestFile);
}

// Return only base file name without dir. Most recent is by creation date.
export function getMostRecentFileName(dir) {
	const files = readdirSync(dir);
	if (files.length === 0) {
		throw new Error(`getMostRecentFileName: dir is empty, cannot select most recent file`);
	}

	const latestFile = _.max(files);
	return path.join(dir, latestFile);
}

// recoverOrSetupDB recovers from the latest DB state, if one exists. Else it sets internalDB to {} to start anew
async function recoverOrSetupDB() {
	var latestDBFilename;
	try {
		latestDBFilename = await getMostRecentFileName(persister.saveDir);
	} catch (e) {
		if (e.message.includes(`dir is empty`)) {
			// nothing to recover from, set internalDB to empty
			logger.warn("recoverOrSetupDB: no DB to restore from, starting in-memory empty");
			return "";
		}
		throw new Error(`recoverOrSetupDB: error retrieving latest DB: ${e}`);
	}

	return latestDBFilename;
}

export async function loadDBFromFile() {
    const latestFilename = await recoverOrSetupDB();

	// if the dir is empty its probably the first time starting up -- therefore our DB should be empty
	if (latestFilename === "") {
        logger.info("[persister] no DB to load");
		return {};
	}
    logger.info("[persister] LOADING DB FROM FILE: recovered from %s", latestFilename);
	const persistedFile = readFileSync(latestFilename);
    logger.info(`[persister] loading data like this: ${persistedFile.toString().substring(0, 500)}`);

	return JSON.parse(persistedFile);
}
