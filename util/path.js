const path = require('path');

//module.exports = path.dirname(process.mainModule.filename);
module.exports = path.dirname(require.main.filename);

//This will return the path of the project's main file app.js from which we can construct other paths using path.join