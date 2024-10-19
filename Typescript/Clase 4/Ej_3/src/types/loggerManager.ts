/* Dividir responsabilidades
Responsabilidades:
Tipos a crear: LogLevel | Mensajes | Formato de fecha | Destino de logs
Interfaces a crear : LoggerConfig | LogMessage | DateFormat | LogDestination
Funcionalidades a configurar : Niveles de log | Formato de fecha | Destino de logs | Mensajes de log
Micro funciones a configurar: Formatos diferentes de fechas | Cambios de destino de logs | Mensajes de log | Niveles de log
Detalles: Retornar mensajes para el usuario | Colores en consola |  Mensajes personalizados por cada nivel
*/


export type LogLevel = "DEBUG" | "INFO" | "WARN" | "ERROR";

export interface LoggerConfig {
    minLevel: LogLevel;
    dateFormat: string;
    destination: "consola" | "archivo";
}

export interface LogMessage {
    level: LogLevel;
    message: string;
}

export interface DateFormat {
    format: string;
}

export interface LogDestination {
    destination: "consola" | "archivo";
}