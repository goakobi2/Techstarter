const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;
const path = require('path');
const fs = require('fs');

const logDirectory = path.join(__dirname, 'logs');
if(!fs.existsSync(logDirectory)){
    fs.mkdirSync(logDirectory);
}

const own_timestamp = timestamp({format: 'YYYY-MM-DD HH:mm:ss'})

const logFormat = printf(({ level, message, timestamp}) => {
    return `${timestamp} [${level}]: ${message}`
})

const logger = createLogger({
    level: 'info',
    format: combine(
        own_timestamp,
        logFormat
    ),
    transports: [
        new transports.Console({
            format: combine(
                format.colorize(),
                own_timestamp,
                logFormat
            )
        }),
        new transports.File({ 
            filename: path.join(logDirectory, 'application.log')
        })
    ]
});

module.exports = logger;
