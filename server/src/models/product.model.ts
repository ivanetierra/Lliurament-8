import { DataTypes } from 'sequelize';
import db from '../db/connection.db';

const Product = db.define('Product', {
    name: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.FLOAT
    },
    stock: {
        type: DataTypes.INTEGER
    }
}, {
    timestamps: false,
    updatedAt: false
}
);

export default Product; 