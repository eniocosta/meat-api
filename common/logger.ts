import * as bunyan from 'bunyan'
import {environment} from './environment'

export const logger = bunyan.createLogger({
    name: environment.configs.logName,
    level: (<any>bunyan).resolveLevel(environment.configs.logLevel)
})