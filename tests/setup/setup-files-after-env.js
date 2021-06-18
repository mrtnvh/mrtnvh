const { toMatchImageSnapshot } = require("jest-image-snapshot");
const withMessage = require("./jest-expect-message");

global.expect = withMessage(global.expect);
expect.extend({ toMatchImageSnapshot });
