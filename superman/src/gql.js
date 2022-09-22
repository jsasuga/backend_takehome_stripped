// Pull out a "search term" from a GQL string.
//
// gqlBody -- { login (email: "fake@bob.com" password: "123") {jwt} }
// searchTerm -- "email"
//
// returns: "fake@bob.com"
export function extractGQLSearchTerm(gqlBody, searchTerm) {
    var matches = gqlBody.match(`${searchTerm}: "([^"]*)"`);
    if (matches.length == 0) {
        throw `[extractGQLSearchTerm] could not find ${searchTerm} in ${gqlBody}`;
    }
    return matches[1];
}
