import _ from "lodash";
import { JSONStringifyObjects } from "./logger.js";

// Update the console.log function so that objects become JSON by default - yay!
var console_log = console.log;
console.log = function (...args) {
	console_log(...JSONStringifyObjects(args));
};

// Object.prototype.isNullOrEmpty = () => {
//     return (this === null || this === undefined || this === {})
// };

// export default {};