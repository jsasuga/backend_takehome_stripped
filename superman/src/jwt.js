import jwt from "jsonwebtoken";
import { logger } from "./logger.js";
import { getModelFromInternalDB } from "./db/internalDB.js";

const jwtKey = "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",
      jwtIss = "Cultos",
      jwtAud = "cultos.io",
      jwtAlgo = "HS512";

export const notWidgetUserBrandID = "NOT LOGGED IN THROUGH WIDGET; there is no brand ID";

export function JWTSign(email) {
    return JWTSignVerbose(email, notWidgetUserBrandID);
}

export function JWTSignWidget(email, widgetBrandID) {
    return JWTSignVerbose(email, widgetBrandID);
}

function JWTSignVerbose(email, widgetBrandID) {
    try {
        // RANDOM TOKEN ID
        let char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~!@#$%^&_-", rnd = "";
        for (let i=0; i<16; i++) {
            rnd += char.charAt(Math.floor(Math.random() * char.length));
        }

        // UNIX NOW
        let now = Math.floor(Date.now() / 1000);
        let user = getModelFromInternalDB("userAccount", {email: email});

        // SIGN TOKEN
        return jwt.sign({
            iat : now, // ISSUED AT - TIME WHEN TOKEN IS GENERATED
            nbf : now, // NOT BEFORE - WHEN THIS TOKEN IS CONSIDERED VALID
            exp : now + (3600 * 24 * 7), // EXPIRY - one week
            jti : rnd,
            iss : jwtIss, // ISSUER
            aud : jwtAud, // AUDIENCE
            // WHATEVER ELSE YOU WANT TO PUT
            data : {
                email : email,
                userID: user.id,
                // for when we are on the widget; this is brand.id for the brand that the user is
                // currently on
                widgetBrandID: widgetBrandID,
            }
        }, jwtKey, { algorithm: jwtAlgo });
    } catch (error) {
        logger.error("[JWTSignVerbose] failed to create JWT key; error: %s", error);
        return false;
    }
};

// (C3) VERIFY TOKEN
export function JWTVerify(cookies) {
    if (cookies.JWT===undefined) { return false; }
    try {
        let decoded = jwt.verify(cookies.JWT, jwtKey);
        // DO WHATEVER EXTRA CHECKS YOU WANT WITH DECODED TOKEN
        // logger.info(decoded);
        return true;
    } catch (err) { return false; }
};

// pass in the request object and get the userID back (of the current user)
export function getUserIDFromRequest(req) {
    // auth is the jwt
    var auth = req.headers.authorization;
    if (!auth) {
        // the user has not logged in; there is not user ID
        return null;
    }

    let decoded = jwt.verify(auth, jwtKey);
    let userID = decoded.data.userID;
    return userID;
};

// pass in the request object and get the brandID back (of the)
export function getWidgetBrandIDFromRequest(req) {
    // auth is the jwt
    var auth = req.headers.authorization;
    if (!auth) {
        logger.warn("[getWidgetBrandIDFromRequest] there is no jwt; returning null");
        // the user has not logged in; there is not brand ID
        return null;
    }

    let decoded = jwt.verify(auth, jwtKey);
    let widgetBrandID = decoded.data.widgetBrandID;
    return widgetBrandID;
};
