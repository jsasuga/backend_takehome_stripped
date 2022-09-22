import { setupRoutes as api } from './api.js';
import { setupRoutes as admin } from './admin.js';
import { setupRoutes as test } from './test.js';

export function setupRoutes(app, getServers) {
    admin(app, getServers);
    api(app);
    test(app);
}
