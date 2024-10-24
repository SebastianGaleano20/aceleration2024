"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
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
const types_1 = require("types/types");
const node_fs_1 = require("node:fs");
//Clase para formatear la fecha y crear el mensaje de LOG.
class DefaultFormatter {
    /* Se puede construir la funcion de la siguiente manera:
        private dateFormat: DateFormat;         Inicio la variable con el tipo de dato DateFormat (USA,ARG,CH,ISO)
        constructor(dateFormat: DateFormat) {   Utilizo el constructor para crear el objeto y asignarle el tipo de dato
           this.dateFormat = dateFormat;        Asigno el tipo de dato al objeto creado
      } */
    constructor(dateFormat) {
        this.dateFormat = dateFormat;
    }
    /*
    Creamos un metodo privado para formatear la fecha para retornar un mensaje distinto
    por cada formato de fecha que se le pase.
    */
    formatDate(date) {
        //Si es formato ISO se utiliza el metodo toISOString.
        if (this.dateFormat === types_1.DateFormat.ISO) {
            return date.toISOString();
        }
        //Creamos una constante con las opciones para formatear la fecha.
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        };
        /*
        En caso de ser otro formato de fecha,
        se envia la fecha recibida y las opciones creadas para formatear la fecha.
        */
        return date.toLocaleDateString(this.dateFormat, options);
    }
    //Al usar implements LogFormatter podemos acceder al metodo format:
    format(logMessage) {
        //Creamos una variable para guardar el formato creado antes de enviarlo por mensaje.
        const formattedDate = this.formatDate(logMessage.timestamp); //Utilizamos la funcion privada formatDate y le enviamos el tiempo recibido por logMessage.timestamp
        //Retornamos el mensaje con el formato tipo LogMessage.
        return `[${formattedDate}] [${logMessage.level}]: ${logMessage.message}`;
    }
}
//Clase para manejar el destino del mensaje creado mediante un archivo.
class FileDestination {
    //Creamos un constructor para recibir el path del archivo
    constructor(filePath) {
        this.filePath = filePath;
    }
    //Utilizamos el metodo write que se implementa en LogDestination
    write(message) {
        const PATH_ROUTE = `${__dirname}`; //Guardamos la ruta del directorio en donde se encuentra mi archivo actual (en este caso src)
        const filePath = `${PATH_ROUTE}/logs/${this.filePath}`; //Le indicamos al archivo que se guarde dentro de la carpeta logs
        (0, node_fs_1.appendFileSync)(filePath, message + '\n'); //Utilizamos el metodo appendFileSync para guardar el mensaje en el archivo
    }
}
//Clase para manejar el destino de los logs mediante la consola.
class ConsoleDestination {
    constructor() {
        //Creamos un objeto privado unicamente para utilizar dentro de esta función.
        this.colorMap = {
            DEBUG: '\x1b[36m', //Cyan
            INFO: '\x1b[32m', //Verde
            WARN: '\x1b[33m', //Amarillo
            ERROR: '\x1b[31m' //Rojo
        };
    }
    //Utilizamos el metodo write que se implementa en LogDestination.
    write(message) {
        console.log(message);
    }
    //Creamos un metodo para escribir el mensaje en color.
    writeColored(level, message) {
        const color = this.colorMap[level];
        console.log(`${color}${message}\x1b[0m`);
    }
}
//Clase para Loggear
class Logger {
    //Creamos el contructor de la clase
    constructor(config) {
        this.config = config;
        //Creamos un orden de niveles con Record
        this.levelOrder = {
            DEBUG: 0,
            INFO: 1,
            WARN: 2,
            ERROR: 3
        };
        this.formatter = config.formatter || new DefaultFormatter(config.dateFormat); //Indicamos el formato de fecha
        this.destinations = config.destinations || [new ConsoleDestination()]; //Indicamos el destino del LOG
    }
    //Seteamos el nivel minimo indicado.
    setMinLevel(level) {
        this.config.minLevel = level;
    }
    //Agregamos un nuevo destino al LOG
    addDestination(destination) {
        this.destinations.push(destination);
    }
    //Eliminamos un destino del LOG
    removeDestination(destination) {
        this.destinations = this.destinations.filter((dest) => dest !== destination);
    }
    //Cambiamos el formato de fecha
    changeDateFormat(dateFormat) {
        this.formatter = new DefaultFormatter(dateFormat);
    }
    //Cambiamos el formato de LOG
    changeFormatter(formatter) {
        this.formatter = formatter;
    }
    //Cambiamos el destino de LOG
    changeDestinations(destinations) {
        this.destinations = destinations;
    }
    //Cambiamos el nivel minimo de LOG
    changeMinLevel(level) {
        this.config.minLevel = level;
    }
    //Creamos una función para determinar que mensajes mostrar.
    shouldLog(level) {
        return this.levelOrder[level] >= this.levelOrder[this.config.minLevel]; //Retornamos un booleano para saber si se debe mostrar el mensaje.
    }
    //Creamos un metodo para LOG
    log(level, message) {
        if (!this.shouldLog(level)) { //Si no debe mostrarse el mensaje, retornamos.
            return;
        }
        //Creamos un objeto de tipo LogMessage
        const logMessage = {
            level,
            message,
            timestamp: new Date()
        };
        //Creamos una variable para guardar el mensaje formateado
        const formattedMessage = this.formatter.format(logMessage);
        //Indicamos el destino del LOG
        this.destinations.forEach((destination) => {
            if (destination instanceof ConsoleDestination) {
                destination.writeColored(level, formattedMessage);
            }
            else {
                destination.write(formattedMessage);
            }
        });
    }
}
exports.Logger = Logger;
