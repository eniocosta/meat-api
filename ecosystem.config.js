module.exports = {
  apps : [{
    name   : "meat-api",
    script : "./dist/main.js",
    instances: 0, //0 = Número de processos de acordo o número de CPUS
    exec_mode: "cluster",
    watch: true,
    merge_logs: true, //Inidica que os logs devem ser salvos em um único arquivo
    env: {
        SERVER_PORT: 5000,
        DB_URL: 'mongodb://localhost/meat-api',
        ENABLE_HTTPS: true,
        NODE_ENV: "development"
    },
    env_production: {
        SERVER_PORT: 5001,
        NODE_ENV: "production",
        ENABLE_HTTPS: true
    }
  }]
}
