import {
	updateModelInInternalDB,
	listModelsFromInternalDB,
	getModelFromInternalDB,
	addModelToInternalDB,
	upsertModelInInternalDB,
} from "../db/internalDB.js";
import { extractGQLSearchTerm } from "../gql.js";
import _ from "lodash";

import { logger } from "../../src/logger.js";
import { runHooks } from "./hooks/crudHooks.js";
import { getUserIDFromRequest, getWidgetBrandIDFromRequest, notWidgetUserBrandID } from "../jwt.js";

// todo-graham: generalize the error-catching code (and logging)

function getStandardHookExtrasFromRequest(req) {
	var widgetBrandID = getWidgetBrandIDFromRequest(req);

	return {
		userID: null,
		widgetBrandID: widgetBrandID,
		isWidgetUser: notWidgetUserBrandID != widgetBrandID,
	};
}

export function setupRoutes(app) {
	app.post("/api/:model/update", async (req, res) => {
		var modelName = req.params.model;
		var newModel = req.body;
		var id = newModel.id;

		if (id === undefined) {
			res.status(500).send({
				error: "you must specify an id in your request body",
			});
			return;
		}

		try {
			var dbModel = getModelFromInternalDB(modelName, { id: id });

			// copy newModel in dbModel
			_.merge(dbModel, newModel);
			var finalModel = await runHooks("update", modelName, dbModel, getStandardHookExtrasFromRequest(req));
			updateModelInInternalDB(modelName, id, finalModel);
			res.send(dbModel);
		} catch (error) {
			logger.error(`[/api/${modelName}/update] found error: %s`, error);
			res.status(500).send({
				error: error,
			});
		}
	});

	app.post("/api/:model/get", async (req, res) => {
		var modelName = req.params.model;
		var searchParams = req.body;
		var model;

		try {
			searchParams = await runHooks("get", modelName, searchParams, getStandardHookExtrasFromRequest(req));
			logger.info(`[/api/${modelName}/get] searching by these params: %s`, searchParams);

			model = getModelFromInternalDB(modelName, searchParams);

			var logModel = _.clone(model);
			if (modelName === "brand") {
				logModel.brandIMG = "**hidden for logging**";
				logModel.tokenIMG = "**hidden for logging**";
			}

			model = await runHooks("getPost", modelName, model, getStandardHookExtrasFromRequest(req));

			logger.info(`[/api/${modelName}/get] returning this model: %s`, logModel);
			res.send(model);
		} catch (error) {
			logger.error(`[/api/${modelName}/get] found error: %s`, error);
			res.status(500).send({
				error: error,
			});
		}
	});

	app.post("/api/:model/list", async (req, res) => {
		var modelName = req.params.model;
		var searchParams = req.body;
		var models;
		var isGQLRequest = false;

		// todo-graham: match structure of other routes
		try {
			if (searchParams.request != undefined) {
				var gqlString = searchParams.request;
				logger.info(`[/api/${modelName}/list] received GQL request: %s`, gqlString);
				isGQLRequest = true;

				if (modelName == "User") {
					var email = extractGQLSearchTerm(gqlString, "email");
					searchParams = {
						email: email,
					};
				} else {
					throw `we do not support GQL list for the model ${modelName}`;
				}
			}

			searchParams = await runHooks("list", modelName, searchParams, getStandardHookExtrasFromRequest(req));
			logger.info(`[/api/${modelName}/list] searching by these params: %s`, searchParams);

			models = listModelsFromInternalDB(modelName, searchParams);

			logger.info(`[/api/${modelName}/list] models before listPost: %s`, models);
			models = await runHooks("listPost", modelName, models, getStandardHookExtrasFromRequest(req));
			logger.info(`[/api/${modelName}/list] returning these models: %s`, models);

			var result = models;
			if (isGQLRequest) {
				result = {
					data: {
						query: result,
					},
				};
			}

			res.send(result);
		} catch (error) {
			// todo-graham: abstract out the error-catching
			logger.error(`[/api/${modelName}/list] found error: %s`, error);
			res.status(500).send({
				error: error,
			});
		}
	});

	app.post("/api/:model/create", async (req, res) => {
		var modelName = req.params.model;
		var modelData = req.body;

		try {
			modelData = await runHooks("create", modelName, modelData, getStandardHookExtrasFromRequest(req));
			addModelToInternalDB(modelName, modelData);

			modelData = await runHooks("createPost", modelName, modelData, getStandardHookExtrasFromRequest(req));

			// return the model data with its new id
			res.send(modelData);
		} catch (error) {
			logger.error(`[/api/${modelName}/create] found error: %s`, error);
			res.status(500).send({
				error: error,
			});
		}
	});

	app.post("/api/:model/upsert", async (req, res) => {
		let modelName = req.params.model;
		let newModel = req.body.newModel;
		let searchParams = req.body.searchParams;

		try {
            var updatedModel = await runHooks("upsert", modelName, newModel, getStandardHookExtrasFromRequest(req));
			upsertModelInInternalDB(modelName, updatedModel, searchParams);
            updatedModel = await runHooks("upsertPost", modelName, newModel, getStandardHookExtrasFromRequest(req));
            res.send(updatedModel);
		} catch (error) {
			logger.error(`[/api/${modelName}/upsert] found error: %s`, error);
			res.status(500).send({
				error: error,
			});
		}
	});

	app.post("/api/:model/exists", (req, res) => {
		var modelName = req.params.model;
		var searchParams = req.body;
		var model;

		try {
			logger.info(`[/api/${modelName}/exists] searching by these params: %s`, searchParams);

			var models = listModelsFromInternalDB(modelName, searchParams);
			var result = {
				exists: models.length > 0,
			};

			res.send(result);
		} catch (error) {
			logger.error(`[/api/${modelName}/exists] found error: %s`, error);
			res.status(500).send({
				error: error,
			});
		}
	});
}
