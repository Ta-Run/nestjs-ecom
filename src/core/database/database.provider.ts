import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../database/constant';
import { databaseConfig } from './database.config';
import { User } from 'src/modules/users/users.entity';
import { Product } from 'src/modules/product/product.entity';
import { OtpEntity } from '../mailer/otp.entity';
export const databaseProviders = [{
    provide: SEQUELIZE,
    useFactory: async () => {
        let config;
        switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
           config = databaseConfig.development;
           break;
        case TEST:
           config = databaseConfig.test;
           break;
        case PRODUCTION:
           config = databaseConfig.production;
           break;
        default:
           config = databaseConfig.development;
        }
        const sequelize = new Sequelize(config);
        sequelize.addModels([User,Product,OtpEntity]);
        await sequelize.sync();
        return sequelize;
    },
}];