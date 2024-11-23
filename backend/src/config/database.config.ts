import logger from '@utils/logger';
import { Sequelize } from 'sequelize';
import config from './env.config';
const { password, user, host, databaseName } = config;

const sequelize = new Sequelize(

    databaseName as string,
    user as string,
    password as string,
    {
        host,
        dialect: 'postgres',
    }
);

// Function to initialize and authenticate the database
export const initializeDatabase = async () => {
    try {
        await sequelize.authenticate();
        // await sequelize.drop()

        logger.info('Database connection has been established successfully.');
        // await sequelize.sync({ force: true });
        // logger.info('Database has been dropped and recreated.');
    } catch (error) {
        logger.error('Unable to connect to the database:', error);
        process.exit(1); // Exit process with a failure code
    }
};

export default sequelize;
