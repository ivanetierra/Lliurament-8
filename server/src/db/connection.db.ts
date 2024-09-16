import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('store', 'root', 'root', 
    {
        host: 'localhost',
        dialect: 'mysql' 
    }
);

export default sequelize;