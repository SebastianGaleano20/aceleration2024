"use strict";
class Logger {
    constructor(config) {
        this.levelGrade = {
            DEBUG: 0,
            INFO: 1,
            WARN: 2,
            ERROR: 3
        };
        // Configurar el logger
        this.minLevel = config.minLevel;
        this.dateFormat = config.dateFormat;
        this.destination = config.destination;
    }
    log(level, message) {
        // Implementar el método de logging 
        if (this.levelGrade[level] >= this.levelGrade[this.minLevel]) { //Comparamos el nivel recibido por parametro al asignado en el constructor
            const timestamp = this.dateFormat;
            //Obtenemos la fecha actual
            const logMessage = `FECHA: [${timestamp}], NIVEL: [${level}]: ${message}`;
            console.log(logMessage);
        }
    }
    logDestination(destination) {
        // Implementar el método para cambiar el destino de los logs
        this.destination = destination;
        console.log(`Destination changed to ${destination}`);
    }
}
const log1 = new Logger({ "minLevel": "DEBUG", "dateFormat": new Date().toLocaleDateString('es-ES'), "destination": "consola" });
const log2 = new Logger({ "minLevel": "INFO", "dateFormat": new Date().toLocaleDateString('es-ES'), "destination": "archivo" });
const log3 = new Logger({ "minLevel": "WARN", "dateFormat": new Date().toLocaleDateString('es-ES'), "destination": "consola" });
const log4 = new Logger({ "minLevel": "ERROR", "dateFormat": new Date().toLocaleDateString('es-ES'), "destination": "archivo" });
log1.log("DEBUG", "DEBUG MESSAGE");
log2.log("INFO", "INFO MESSAGE");
log3.log("WARN", "WARN MESSAGE");
log4.log("ERROR", "ERROR MESSAGE");
log1.logDestination("archivo");
log2.logDestination("consola");
log3.logDestination("archivo");
log4.logDestination("consola");
