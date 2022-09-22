import _ from "lodash";
import { logger } from "../../logger.js";
import { allHooks } from "./masterHookList.js";

export function getHook(crudAction, modelName) {
	var hooks = allHooks[modelName];
	if (hooks === undefined) {
		return null;
	}
	var hook = hooks[crudAction];
	if (hook === undefined) {
		return null;
	}

	return hook;
}

export async function runHooks(crudAction, modelName, model, extra) {
	var possibleCrudActions = ["get", "update", "create", "list", "getPost", "createPost", "listPost", "upsert", "upsertPost"];
	if (-1 == _.indexOf(possibleCrudActions, crudAction)) {
		throw `[runHooks] unknown crudAction; you have supplied '${crudAction}'`;
	}

	var hook = getHook(crudAction, modelName);
	if (hook === null) {
		logger.info(
			`[runHooks] no hook found for crudAction=${crudAction}, modelName=${modelName}; returning the model that the caller passed in`
		);
		return model;
	}

	var updatedModel = await hook(model, extra);
	if (!updatedModel) {
		// return the starting model if the hook doesn't modify it
		updatedModel = model;
	}
	return updatedModel;
}
