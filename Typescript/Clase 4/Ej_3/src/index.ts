import { DateFormat } from 'types/types'
import { Logger, FileDestination, DefaultFormatter, ConsoleDestination } from 'services/loggerManager'

const logger = new Logger({
    minLevel: 'DEBUG',
    dateFormat: DateFormat.ARGENTINA,
})

logger.changeDateFormat(DateFormat.USA)
logger.changeFormatter(new DefaultFormatter(DateFormat.ISO))
logger.changeMinLevel('WARN')
logger.addDestination(new FileDestination('logs/logs.txt'))
logger.log('DEBUG', 'Este es un mensaje de DEBUG')
logger.log('INFO', 'Este es un mensaje de INFO')
logger.log('WARN', 'Este es un mensaje de WARN')
logger.log('ERROR', 'Este es un mensaje de ERROR')
logger.setMinLevel('ERROR')