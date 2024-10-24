"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("types/types");
const loggerManager_1 = require("services/loggerManager");
const logger = new loggerManager_1.Logger({
    minLevel: 'DEBUG',
    dateFormat: types_1.DateFormat.ARGENTINA,
});
logger.log('DEBUG', 'Este es un mensaje de DEBUG');
logger.log('INFO', 'Este es un mensaje de INFO');
logger.log('WARN', 'Este es un mensaje de WARN');
logger.log('ERROR', 'Este es un mensaje de ERROR');
