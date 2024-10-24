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
import { DateFormat, LogDestination, LogFormatter, LogLevel, LogMessage, LoggerConfig } from "./types/types";
import { appendFileSync } from "node:fs";

//Clase para formatear la fecha y crear el mensaje de LOG.
class DefaultFormatter implements LogFormatter {
    /* Se puede construir la funcion de la siguiente manera:
        private dateFormat: DateFormat;         Inicio la variable con el tipo de dato DateFormat (USA,ARG,CH,ISO)
        constructor(dateFormat: DateFormat) {   Utilizo el constructor para crear el objeto y asignarle el tipo de dato
           this.dateFormat = dateFormat;        Asigno el tipo de dato al objeto creado
      } */
    constructor(private dateFormat: DateFormat) { }
    /* 
    Creamos un metodo privado para formatear la fecha para retornar un mensaje distinto
    por cada formato de fecha que se le pase. 
    */
    private formatDate(date: Date): string {
        //Si es formato ISO se utiliza el metodo toISOString.
        if (this.dateFormat === DateFormat.ISO) {
            return date.toISOString();
        }
        //Creamos una constante con las opciones para formatear la fecha.
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'

        }
        /* 
        En caso de ser otro formato de fecha,
        se envia la fecha recibida y las opciones creadas para formatear la fecha.
        */
        return date.toLocaleDateString(this.dateFormat, options);
    }
    //Al usar implements LogFormatter podemos acceder al metodo format:
    format(logMessage: LogMessage): string {
        //Creamos una variable para guardar el formato creado antes de enviarlo por mensaje.
        const formattedDate = this.formatDate(logMessage.timestamp); //Utilizamos la funcion privada formatDate y le enviamos el tiempo recibido por logMessage.timestamp
        //Retornamos el mensaje con el formato tipo LogMessage.
        return `[${formattedDate}] [${logMessage.level}]: ${logMessage.message}`
    }
}
//Clase para manejar el destino del mensaje creado mediante un archivo.
class FileDestination implements LogDestination {
    //Creamos un constructor para recibir el path del archivo
    constructor(private filePath: string) { }
    //Utilizamos el metodo write que se implementa en LogDestination
    write(message: string): void {
        const PATH_ROUTE = `${__dirname}` //Guardamos la ruta del directorio en donde se encuentra mi archivo actual (en este caso src)
        const filePath = `${PATH_ROUTE}/logs/${this.filePath}` //Le indicamos al archivo que se guarde dentro de la carpeta logs
        appendFileSync(filePath, message + '\n') //Utilizamos el metodo appendFileSync para guardar el mensaje en el archivo
    }
}
//Clase para manejar el destino de los logs mediante la consola.
class ConsoleDestination implements LogDestination {
    //Creamos un objeto privado unicamente para utilizar dentro de esta función.
    private colorMap: Record<LogLevel, string> = {
        DEBUG: '\x1b[36m', //Cyan
        INFO: '\x1b[32m', //Verde
        WARN: '\x1b[33m', //Amarillo
        ERROR: '\x1b[31m' //Rojo
    };
    //Utilizamos el metodo write que se implementa en LogDestination.
    write(message: string): void {
        console.log(message)
    }
    //Creamos un metodo para escribir el mensaje en color.
    writeColored(level: LogLevel, message: string): void {
        const color = this.colorMap[level];
        console.log(`${color}${message}\x1b[0m`);
    }
}
//Clase para Loggear
class Logger {
    //Creamos un orden de niveles con Record
    private levelOrder: Record<LogLevel, number> = {
        DEBUG: 0,
        INFO: 1,
        WARN: 2,
        ERROR: 3
    };
    //Creamos una instancia de destino y formato de LOG
    private formatter: LogFormatter;
    private destinations: LogDestination[];
    //Creamos el contructor de la clase
    constructor(private config: LoggerConfig) { //Utilizamos el formato de LoggerConfig
        this.formatter = config.formatter || new DefaultFormatter(config.dateFormat); //Indicamos el formato de fecha
        this.destinations = config.destinations || [new ConsoleDestination()]; //Indicamos el destino del LOG
    }
    //Seteamos el nivel minimo indicado.
    setMinLevel(level: LogLevel): void {
        this.config.minLevel = level;
    }
    //Creamos una función para determinar que mensajes mostrar.
    private shouldLog(level: LogLevel): boolean {
        return this.levelOrder[level] >= this.levelOrder[this.config.minLevel]; //Retornamos un booleano para saber si se debe mostrar el mensaje.
    }
    //Creamos un metodo para LOG
    log(level: LogLevel, message: string): void {
        if (!this.shouldLog(level)) { //Si no debe mostrarse el mensaje, retornamos.
            return;
        }
        //Creamos un objeto de tipo LogMessage
        const logMessage: LogMessage = {
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
            } else {
                destination.write(formattedMessage)
            }
        })
    }
}