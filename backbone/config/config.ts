import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'development') {
  dotenv.config();
}

export default {
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'localhost',
  saltWorkFactor: 10,
  carOfferMinLimit: process.env.CAR_OFFER_MIN_LIMIT || 5000,
  carAgeLimitMessage: 'Sorry! The driver is too young',
  carTooHighRiskMessage: 'Sorry! We can not accept this particular risk',
  frontOfficeAllowCors: process.env.FRONTOFFICE_ALLOW_CORS || 'http://localhost:4200',
  db: {
    uri: process.env.DB_URI || '127.0.0.1',
    port: process.env.DB_PORT || 27017,
    name: process.env.DB_NAME || 'car_insurance_db'
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'qoversupersecret',
    expiration: process.env.JWT_EXPIRATION || 3600 * 30, // defaults to 30 days
    issuer: process.env.JWT_ISSUER || 'QoverCompany'

  },
  loggerConfiguration: {
    consoleLogLevel: process.env.LOG_CONSOLE_LEVEL || 'debug',
    logToFile: process.env.LOG_TO_FILE || true,
    fileLogLevel: process.env.LOG_FILE_LEVEL || 'debug',
    filename: 'backbone.log'
  }
};
