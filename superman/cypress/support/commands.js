require("../../src/languageSetup.js");
import { logger } from "../../src/logger.js";
import { getURLPrefixForSupermanWithPort } from "./navigation_utils.js";

function needsDataCYTag(name) {
	return !name.toString().includes("#") && !name.toString().includes(".") && !name.toString().includes("data-cy");
}

function wrapInDataCYTag(name) {
	if (needsDataCYTag(name)) {
		return `[data-cy=${name}]`;
	}
	return name;
}

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("post", (urlPath, body, jwtToken = "") => {
	return cy.request({
		method: "POST",
		url: `${getURLPrefixForSupermanWithPort()}/${urlPath}`,
		body: body,
		log: true,
		headers: {
			authorization: jwtToken,
		},
		failOnStatusCode: false,
	});
});

Cypress.Commands.add("get_request", (urlPath, body) => {
	var jwtToken = "";
	var url = `${getURLPrefixForSupermanWithPort()}/${urlPath}`;
	if (body === undefined) {
		body = {};
	}

	logger.info(`sending request:`, url, ", with body:", body);
	return cy.request({
		method: "GET",
		url: url,
		body: body,
		log: true,
		headers: {
			authorization: jwtToken,
		},
		failOnStatusCode: false,
	});
});

// allow logger.info to work in the shell.
Cypress.Commands.overwrite("log", (subject, message) => cy.task("log", message));

/**
 * Checks if an element is visible
 * name - name of the element
 * parentEl - element to wrap cypress
 */
Cypress.Commands.add("isVisible", function (name, parentEl) {
	name = wrapInDataCYTag(name);
	logger.info(`[isVisible] search for element with name '${name}'`);
	if (parentEl) {
		cy.wrap(parentEl).find(name).should("be.visible");
	} else {
		cy.get(name).should("be.visible");
	}
});

Cypress.Commands.add('isVisibleDisplayNone', {
  prevSubject: true
}, (subject) => {
  const isVisible = (elem) => !!(
    elem.offsetWidth ||
    elem.offsetHeight ||
    elem.getClientRects().length
  )
  expect(isVisible(subject[0])).to.be.true
});

/**
 * Checks if an element is visible
 * name - name of the element
 * parentEl - element to wrap cypress
 */
Cypress.Commands.add("exists", function (name, parentEl) {
	if (!name.toString().includes("#") && !name.toString().includes(".")) {
		name = `[data-cy=${name}]`;
	}
});

/**
 * Checks if an element is visible then click on it
 * name - name of the element
 * parentEl - element to wrap cypress
 * forceTrue - force the click
 */
Cypress.Commands.add("isVisibleAndClick", function (name, parentEl, forceTrue, position) {
    var foundError = false;
	cy.isVisible(name, parentEl);
	cy.vClick(name, parentEl, forceTrue, position);
});

/**
 * Checks if an element is visible then click on it
 * name - name of the element
 * parentEl - element to wrap cypress
 * forceTrue - force the click
 */
Cypress.Commands.add("isVisibleAndInput", function (name, value, position, parentEl) {
	cy.isVisible(name, parentEl);
	cy.vInput(name, value, position, parentEl);
});

Cypress.Commands.add('isVisibleAndContains', function(name, value, parentEl) {
    cy.isVisible(name, parentEl);
    cy.get(wrapInDataCYTag(name)).contains(value);
});

/**
 * Triggers the logic to enter a value in textbox
 * name - name of the element
 * value - value to select
 * position - which element position to select on if theres multiple
 * parentEl - element to wrap cypress
 */
Cypress.Commands.add("vInput", function (name, value, position, parentEl) {
	let vInputName = wrapInDataCYTag(name);

	let cypressEl = cy.get(vInputName);
	if (parentEl) {
		cypressEl = cy.wrap(parentEl).find(vInputName);
	}
	switch (position) {
		case "first":
			cypressEl.first().clear().type(value);
			break;
		case "last":
			cypressEl.last().clear().type(value);
			break;
		default:
			cypressEl.clear({ force: true }).type(value);
			break;
	}
});

/**
 * Clicks on an element
 * name - name of the element
 * parentEl - element to wrap cypress
 * forceTrue - force the click
 * position - which element position to click on if theres multiple
 */
Cypress.Commands.add("vClick", function (name, parentEl, forceTrue, position) {
    var caughtError = false;


    for (var i=0; i<4; i++) {
        try {
            name = wrapInDataCYTag(name);
	        let cypressEl = cy.get(name);
	        if (parentEl) {
		        cypressEl = cy.wrap(parentEl).find(name);
	        }

	        switch (position) {
		    case "first":
			    cypressEl.first().click({ force: forceTrue || false });
			    break;
		    case "second": // `1` is the second index because element indexing starts at 0
			    cypressEl.eq(1).click({ force: forceTrue || false });
			    break;
		    case "third": // `2` is the third index because element indexing starts at 0
			    cypressEl.eq(2).click({ force: forceTrue || false });
			    break;
		    case "last":
			    cypressEl.last().click({ force: forceTrue || false });
			    break;
		    default:
			    cypressEl.click({ force: forceTrue || false });
			    break;
	        }
            return;
        } catch (error) {
            if (i==3) {
                throw error;
            }
        }
    }
});

// /**
//  * Use a date picker to select a date. Always use the current month.
//  * name - name of the element
//  * posn - "first" or "last" - day of the month
//  */
// Cypress.Commands.add('vDateEnter', function(name, text) {
//     if (needsDataCYTag(name)) {
//         name = `[data-cy=${name}]`;
//     }
//     cy.isVisibleAndInput(name, text);
// });

/**
 * Use a date picker to select a date. Always use the current month.
 * name - name of the element
 * posn - "first" or "last" - day of the month
 */
Cypress.Commands.add("vDateSelect", function (name, posn) {
	if (needsDataCYTag(name)) {
		name = `[data-cy=${name}]`;
	}
	cy.get(name).click();
	cy.get(`td.available span:${posn}`).click();
});

Cypress.Commands.add("containsIsVisible", function (text, parentName) {
	if (parentName === undefined) {
		cy.contains(text).should("be.visible");
	} else {
		if (!parentName.toString().includes("#") && !parentName.toString().includes(".")) {
			parentName = `[data-cy=${parentName}]`;
		}
		console.log(`[containsIsVisible] parentName: `, parentName); // todo-gr: remove
		cy.get(parentName).contains(text).should("be.visible");
	}
});

/**
 * Triggers the logic to select a dropdown value
 * name - name of the element
 * value - value to select
 * position - which element position to select on if theres multiple
 * parentEl - element to wrap cypress
 * options - optional options to chain
 */
Cypress.Commands.add("vSelect", function (name, value, position, parentEl, options, force) {
	let vSelectName = `[data-cy=${name}] > .vs__dropdown-toggle > .vs__selected-options > .vs__search`;
	let cypressEl = cy.get(vSelectName);
	if (parentEl) {
		cypressEl = cy.wrap(parentEl).find(vSelectName);
	}
	switch (position) {
		case "first":
			cypressEl = cypressEl.first();
			break;
		case "last":
			cypressEl = cypressEl.last();
			break;
	}

	switch (options) {
		case "clear":
			cypressEl = cypressEl.clear();
			break;
		case "focus":
			cypressEl = cypressEl.focus();
			break;
		case "focus-clear":
			cypressEl = cypressEl.focus().clear();
			break;
	}

	if (value === "clear") {
		cypressEl.clear();
	} else {
		cypressEl.type(`${value}{enter}`, { force: force });
	}
});
