export const environment = {
    server: { port: process.env.SERVER_PORT || 3000},
    db: { url: process.env.DB_URL || 'mongodb://localhost/meat-api'},
    security: {
        saltRounds: process.env.SALT_ROUNDS || 10,
        apiSecret: process.env.API_SECRET || 'meat-api-secret',
        enableHTTPS: process.env.ENABLE_HTTPS || false,
        certificate: process.env.CERT_FILE || './security/keys/cert.pem',
        keyCertificate: process.env.CERT_KEY_FILE || './security/keys/key.pem'
    },
    configs: { 
        pageSize: parseInt(process.env.PAGE_SIZE) || 2,
        logLevel: process.env.LOG_LEVEL || 'debug',
        logName: process.env.LOG_NAME || 'meat-api.logger'

    }
}