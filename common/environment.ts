export const environment = {
    server: { port: process.env.SERVER_PORT || 3000},
    db: { url: process.env.RB_URL || 'mongodb://localhost/meat-api'},
    security: { saltRounds: process.env.SALT_ROUNDS || 10}
}