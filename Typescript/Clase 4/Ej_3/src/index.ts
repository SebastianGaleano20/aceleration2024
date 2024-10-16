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

class Logger {
    constructor(config: LoggerConfig) {
        // Configurar el logger
    }

    log(level: LogLevel, message: string): void {
        // Implementar el método de logging
    }
}