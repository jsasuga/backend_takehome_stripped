import mappings from "./domainMappings.js";
import _ from 'lodash';

// call this function to get the config for the current domain
//
// override_domain -- you can override the domain too
export default function (override_domain) {
    var domain = process.env.PUBLIC_DOMAIN || "localhost";
    if (override_domain !== undefined) {
        domain = override_domain;
    }

    if (mappings[domain] === undefined) {
        throw `I do not recognize this domain: ${domain}; here are the possible domains: ${_.keys(mappings)}`;
    }

    return mappings[domain];
};
