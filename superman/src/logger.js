import { createLogger, format, transports } from "winston";
import _ from "lodash";
import util from "util";
import fs from 'fs';
import { execSync } from "child_process";

export var logger = newLogger();

// find out if this code is running inside cypress
function insideCypress() {
    // this is a hack!
    return fs.existsSync === undefined;
}

// newLogger configures and returns a new logger instance
function newLogger() {
    const log_output_dir = "log_output";

    // Do not use file logging in cypress. Many packages don't work in cypress like fs and exec.
    if (!insideCypress()) {
        execSync(`mkdir -p ${log_output_dir}`);
        execSync(`rm -f ${log_output_dir}/*.log$`);
    }

    var verboseLoggerConfig = {
	    format: format.combine(
		    format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
		    format.align(),
		    format.printf((info) => `${info.level}: ${[info.timestamp]}: ${info.message}`)
	    ),
    };
    var simpleLoggerConfig = {
        format: format.combine(
		    format.printf((info) => {
                return `${info.level[0]}: ${info.message}`;
            })
	    ),
    };

    var logOutputs = [
		new transports.Console({
			colorize: true,
			...simpleLoggerConfig,
		}),
	];

    // Do not use file logging in cypress. Many packages don't work in cypress like fs and exec.
    if (!insideCypress()) {
        console.log("[newLogger] not running inside cypress, so we will be outputting logs to file");
        var fileOutputs = [
        	new transports.File({
				filename: `${log_output_dir}/just_errors.log`,
				level: "error",
				...verboseLoggerConfig,
			}),
            // we won't delete this one automatically on each run
            new transports.File({
				filename: `${log_output_dir}/just_errors.log.manually_delete`,
				level: "error",
				...verboseLoggerConfig,
			}),
			new transports.File({
				filename: `${log_output_dir}/everything.log`,
				...verboseLoggerConfig,
			}),
            // we won't delete this one automatically on each run
            new transports.File({
				filename: `${log_output_dir}/everything.log.manually_delete`,
				...verboseLoggerConfig,
			})
        ];
        logOutputs = logOutputs.concat(fileOutputs);
    }
	const logger = createLogger({
		format: format.combine(format.splat(), format.simple()),
		transports: logOutputs,
	});

	// Set the logger syntax sugar. Adding a new string here lets you use it on the logger object. Example: `logger.myNewLevel("message %s", x)`
	let levels = ["info", "error", "warn", "verbose", "debug"];
	for (let i in levels) {
        let level = levels[i];
		logger[level] = function (msg, ...var_list) {
			logger.log(level, msg, ...JSONStringifyObjects(var_list));
		};
	}

    logger.info("initialized logging system");

	return logger;
}

export function JSONStringifyObjects(args) {
    function stringify(elem) {
        // stringify objects
		elem = JSON.stringify(util.inspect(elem));
		// do some pretty printing - convert "\n" to actual newlines. I don't know why this doesn't happen by default.
		elem = elem.replace(/\\n/g, "\n");

        var max_length = 500;

        // make sure that each line is below a certain length
        var lines = elem.split("\n");
        for (var i =0; i <lines.length; i++) {
            var line = lines[i];
            if (line.length > max_length) {
                line = line.substring(0, max_length) + " ...";
            }
            lines[i] = line;
        }

        return lines.join("\n");
    }

	var modified_args = [];
	for (var index in args) {
		var elem = args[index];
		if (_.isObject(elem) || _.isArray(elem)) {
            elem = stringify(elem);
		}
		modified_args.push(elem);
	}

	return modified_args;
}
