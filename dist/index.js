module.exports =
/******/ (function(modules, runtime) { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	__webpack_require__.ab = __dirname + "/";
/******/
/******/ 	// the startup function
/******/ 	function startup() {
/******/ 		// Load entry module and return exports
/******/ 		return __webpack_require__(324);
/******/ 	};
/******/
/******/ 	// run startup
/******/ 	return startup();
/******/ })
/************************************************************************/
/******/ ({

/***/ 16:
/***/ (function() {

eval("require")("@actions/core");


/***/ }),

/***/ 25:
/***/ (function() {

eval("require")("lodash.get");


/***/ }),

/***/ 324:
/***/ (function(__unusedmodule, __unusedexports, __webpack_require__) {

const { inspect } = __webpack_require__(669);

const get = __webpack_require__(25);
const core = __webpack_require__(16);

const { json, ...paths } = getAllInputs();

let jsonParsed = {};
try {
  jsonParsed = JSON.parse(json);
} catch {
  jsonParsed = JSON.parse(Buffer.from(json, "base64").toString());
}

try {
  core.debug(`json input: ${inspect(jsonParsed)}`);
  core.debug(`paths inputs: ${inspect(paths)}`);

  for (const [name, path] of Object.entries(paths)) {
    const value = get(jsonParsed, path);
    core.debug(`setting output ${name} to ${value} using "${path}"`);
    core.setOutput(name, value);
  }
} catch (error) {
  core.setFailed(error);
  process.exit(1);
}

function getAllInputs() {
  return Object.entries(process.env).reduce((result, [key, value]) => {
    if (!/^INPUT_/.test(key)) return result;

    const inputName = key.substr("INPUT_".length).toLowerCase();
    result[inputName] = value;
    return result;
  }, {});
}


/***/ }),

/***/ 669:
/***/ (function(module) {

module.exports = require("util");

/***/ })

/******/ });