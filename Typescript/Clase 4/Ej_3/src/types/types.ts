/* 
Dividir responsabilidades:
Tipos a crear: LogLevel✅ | Mensajes | Formato de fecha | Destino de logs
Interfaces a crear : LoggerConfig | LogMessage | DateFormat | LogDestination
Funcionalidades a configurar : Niveles de log | Formato de fecha | Destino de logs | Mensajes de log
Micro funciones a configurar: Formatos diferentes de fechas | Cambios de destino de logs | Mensajes de log | Niveles de log
Detalles: Retornar mensajes para el usuario | Colores en consola |  Mensajes personalizados por cada nivel
*/
//Tipos de niveles de LOG
export type LogLevel = "DEBUG" | "INFO" | "WARN" | "ERROR";
//Tipos de formatos de fechas aceptadas
export enum DateFormat {
    ARGENTINA = "es-ES",
    USA = "en-US",
    CHINA = "zh-CN",
    ISO = "iso"
}
//Interfaz para crear configuraciones de LOG
export interface LoggerConfig {
    minLevel: LogLevel; //Nivel minimo aceptado de type LogLevel
    dateFormat: DateFormat; //Formato de fecha de tipo Date
    destinations?: LogDestination[]; //Destino del LOG puede mostrarse en consola o guardarse en un archivo (json/txt/md etc)
    formatter?: LogFormatter; //Formato de LOG
}
//Interfaz de mensajes de LOG
export interface LogMessage {
    level: LogLevel; //Nivel de LOG utiliza type LogLevel 
    message: string; //Message tipo string
    timestamp: Date; //timestamp tipo fecha
}
//Interfaz para formato de LOG
export interface LogFormatter {
    format(logMessage: LogMessage): string; //Metodo format que utiliza el tipo LogMessage
}
//Interfaz para destino de LOG
export interface LogDestination {
    write(message: string): void; //Metodo para indicar el destino
}

