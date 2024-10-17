/* Sistema de Logging con Niveles Personalizables

*Enunciado:*
Desarrolla un sistema de logging que permita registrar mensajes en diferentes niveles 
(DEBUG, INFO, WARN, ERROR).
El sistema debe permitir la configuración de un nivel mínimo de log y el formato de salida.
También debe ser flexible para soportar múltiples destinos, como la consola o un archivo.

*Requisitos adicionales:*
- Implementa un método para configurar el formato de los mensajes de log (e.g., "[FECHA] [NIVEL]: Mensaje").
- Permite que el sistema de logging filtre los mensajes que están por debajo del nivel mínimo configurado.
- Implementa un método para cambiar dinámicamente el destino de los logs.

*Código base:*
typescript
*/

type LogLevel = "DEBUG" | "INFO" | "WARN" | "ERROR";

interface LoggerConfig {
    minLevel: LogLevel;
    dateFormat: string;
    destination: "consola" | "archivo";
}

class Logger implements LoggerConfig { //Implements para que sea estricto en la estructura de datos
    minLevel: LogLevel;
    dateFormat: string;
    destination: "consola" | "archivo";
    levelGrade: { [key: string]: number } = //Definimos un nivel de grado para cada log
        {
            DEBUG: 0,
            INFO: 1,
            WARN: 2,
            ERROR: 3
        }
    constructor(config: LoggerConfig) {
        // Configurar el logger
        this.minLevel = config.minLevel;
        this.dateFormat = config.dateFormat;
        this.destination = config.destination;
    }

    log(level: LogLevel, message: string): void {
        // Implementar el método de logging 
        if (this.levelGrade[level] >= this.levelGrade[this.minLevel]) { //Comparamos el nivel recibido por parametro al asignado en el constructor
            const timestamp = this.dateFormat; //Obtenemos la fecha actual
            const logMessage =
                `FECHA: ${timestamp},
            NIVEL: [${level}]: ${message}`;
            console.log(logMessage)
        }
    }
}

const log1 = new Logger({ "minLevel": "DEBUG", "dateFormat": Date.now().toString(), "destination": "consola" })
const log2 = new Logger({ "minLevel": "INFO", "dateFormat": Date.now().toString(), "destination": "consola" })
const log3 = new Logger({ "minLevel": "WARN", "dateFormat": Date.now().toString(), "destination": "consola" })
const log4 = new Logger({ "minLevel": "ERROR", "dateFormat": Date.now().toString(), "destination": "consola" })

log1.log("DEBUG", "DEBUG MESSAGE")
log2.log("INFO", "INFO MESSAGE")
log3.log("WARN", "WARN MESSAGE")
log4.log("ERROR", "ERROR MESSAGE")