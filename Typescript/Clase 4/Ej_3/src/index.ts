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

//Clase para formatear la fecha y crear el mensaje de LOG
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
        //Si es formato ISO se utiliza el metodo toISOString
        if (this.dateFormat === DateFormat.ISO) {
            return date.toISOString();
        }
        //Creamos una constante con las opciones para formatear la fecha
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
        se envia la fecha recibida y las opciones creadas para formatear la fecha
        */
        return date.toLocaleDateString(this.dateFormat, options);
    }
    //Al usar implements LogFormatter podemos acceder al metodo format:
    format(logMessage: LogMessage): string {
        //Creamos una variable para guardar el formato creado antes de enviarlo por mensaje
        const formattedDate = this.formatDate(logMessage.timestamp); //Utilizamos la funcion privada formatDate y le enviamos el tiempo recibido por logMessage.timestamp
        //Retornamos el mensaje con el formato tipo LogMessage
        return `[${formattedDate}] [${logMessage.level}]: ${logMessage.message}`
    }
}
//Clase para manejar el destino del mensaje creado
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

class Logger implements LoggerConfig { //Implements para que sea estricto en la estructura de datos
    minLevel: LogLevel;
    dateFormat: string;
    destination: "consola" | "archivo";
    levelGrade: Record<LogLevel, number> =
        //Definimos un nivel de grado para cada log  - Record para typar objetos
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
            const timestamp = this.dateFormat;
            //Obtenemos la fecha actual
            const logMessage = `FECHA: [${timestamp}], NIVEL: [${level}]: ${message}`;
            console.log(logMessage)
        }
    }

    logDestination(destination: "consola" | "archivo"): void {
        // Implementar el método para cambiar el destino de los logs
        this.destination = destination;
        console.log(`Destination changed to ${destination}`)
    }
}