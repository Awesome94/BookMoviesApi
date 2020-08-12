"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const server = app_1.app.listen(5000, '0.0.0.0', () => {
    const { port, address } = server.address();
    console.log('server listening on port', 'http://' + address + ':' + port);
});
//# sourceMappingURL=index.js.map