import _ from "lodash";
import { ulid } from "ulid";
import { logger } from "../logger.js";
import * as persister from "./persister.js";

export var internalDB = {};

export function getInternalDB() {
	return internalDB;
}

// updateModelInInternalDB updates modelName with id to model in memory and on disk
export function updateModelInInternalDB(modelName, id, model) {
	if (internalDB[modelName] === undefined) {
		throw new Error(`there are no models with that name: ${modelName}`);
	}
	if (internalDB[modelName][id] === undefined) {
		throw new Error(`there are no models with that id: ${id}`);
	}

	logger.info(`[updateModelInInternalDB] updating '${modelName}.${id} to %s`, model);

	model.updatedAt = Date.now();
	model.updatedAtFormatted = `${new Date(model.updatedAt)}`;
    // just in-case the ID isn't in the model
    model.id = id;

    var clonedModel = _.clone(model);
	internalDB[modelName][id] = clonedModel;

	persister.writeDBToFile(internalDB);
    return clonedModel;
}

// upsertModelInInternalDB creates a model if one doesn't exist - and updates it if it does
export function upsertModelInInternalDB(modelName, modelData, searchParams) {
	let allMatches = listModelsFromInternalDB(modelName, searchParams);

	if (allMatches.length === 0) {
		logger.info(
			`[upsertModelInInternalDB] did not find '${modelName}' with search params '${JSON.stringify(
				searchParams
			)}'. Creating new model with values: '${JSON.stringify(modelData)}'`
		);
		addModelToInternalDB(modelName, modelData);
	} else {
		let currentModel = allMatches[0];
		logger.info(
			`[upsertModelInInternalDB] found '${currentModel.id}' with search params '${JSON.stringify(
				searchParams
			)}'. Updating model with values: '${JSON.stringify(modelData)}'`
		);
		updateModelInInternalDB(modelName, currentModel.id, {
			...currentModel,
			...modelData,
		});
	}

	// we don't need to write to the DB file because we doing it implicitly through the add/update calls
}

// addModelToInternalDB writes the key modelName with value model in memory and to disk
export function addModelToInternalDB(modelName, modelData) {
	if (internalDB[modelName] === undefined) {
		internalDB[modelName] = {};
	}

	// find/create ID
	var id = modelData.id;
	if (!id) {
		id = ulid();
	}
	modelData.id = id;

	if (internalDB[modelName][id] != undefined) {
		throw `model exists with that ID already; cannot overwrite; id: ${id}`;
	}

	logger.info(
		`[addModelToInternalDB] adding '${modelName}' model to DB: %s`, modelData
	);

	modelData.createdAt = Date.now();
	modelData.createdAtFormatted = `${new Date(modelData.createdAt)}`;

	internalDB[modelName][id] = _.clone(modelData);

	persister.writeDBToFile(internalDB);
	return modelData;
}

// getModelFromInternalDB retrieves the modelName fulfilling searchParams from the in-memory database. The disk version is not accessed
// will throw an error if the model does not exist
export function getModelFromInternalDB(modelName, searchParams) {
	if (typeof modelName != "string") {
		throw `the first parameter has to be a model name; you supplied this: ${modelName}`;
	}
	var allMatches = listModelsFromInternalDB(modelName, searchParams);

	if (allMatches.length == 0) {
		throw `could not find any models of type '${modelName}' that matched these search params: ${JSON.stringify(
			searchParams
		)}`;
	}
	if (allMatches.length > 1) {
		throw `found more than one model of type '${modelName}' that matched these search params: ${JSON.stringify(
			searchParams
		)}`;
	}

	return allMatches[0];
}

export function modelExistsInInternalDB(modelName, searchParams) {
    var allMatches = listModelsFromInternalDB(modelName, searchParams);
    return allMatches.length > 0;
}

// will return an empty object if it cannot find anything in the DB
export function tryToGetModelFromInternalDB(modelName, searchParams) {
	var result = listModelsFromInternalDB(modelName, searchParams);
	if (result.length == 0) {
		return {};
	}
	return result[0];
}

// listModelsFromInternalDB retrieves the models of modelName fulfilling searchParams from the in-memory database. The disk version is not accessed
export function listModelsFromInternalDB(modelName, searchParams) {
	var modelDB = internalDB[modelName];
	if (modelDB === undefined) {
		// no models with that name
		return [];
	}
	var allMatches = _.filter(modelDB, searchParams);

	return allMatches;
}

// clearDB resets the in-memory database to an empty object. The disk is not reset // TODO: Graham -- should the disk not be reset?
export function clearDB() {
	logger.info(`[clearDB] clearing DB of all data`); // rr

	internalDB = {};
	// hack to make sure that we delete all of the files
	for (var i = 0; i < 10; i++) {
		persister.deleteLatestFile();
	}
}

export async function loadDBFromFile() {
	internalDB = await persister.loadDBFromFile();
    return internalDB;
}
