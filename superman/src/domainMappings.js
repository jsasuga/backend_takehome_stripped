// copy this format if you want to use ngrok
var kylesNGROK = (process.env.KYLES_NGROK || "kylesNGROKStub");

var mappings = {};

mappings = {
    ...mappings,
    // we do not support this for testing; we have this here so the shopify plugin won't crash.
    "localhost": {
        // this store should be kyle's store, but I don't which one that is. this code is legacy,
        // and we probably shouldn't use it anymore. however, we need a dummy for the localhost case
        // for now.
        storeName: "cultosdev-kyle.myshopify.com",
        token: "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",
        api_key: "88293dd9211d23028b2748f0e26b1121",
        secret_key: "591d603e2005bdb386148b838b75646e",
        widget_id: "4387545",
        widget_uuid: "669f8264-aad1-4e90-955e-1551c9423022"
    },
};

export default mappings;
