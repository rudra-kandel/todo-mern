import sequelize from '@config/database.config';
import { DataTypes, Model } from 'sequelize';
import { v4 as uuidV4 } from 'uuid';

class User extends Model {
    declare id: string;
    declare email: string;
    declare password: string;
    declare isVerified: boolean;
}

User.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: uuidV4,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    defaultScope: {
        attributes: { exclude: ['password'] },
    },
    scopes: {
        withPassword: {
            attributes: { include: ['id', 'password'] },
        },
    },

});

// User.hasMany(EmailLog, {
//     foreignKey: 'userId',
//     as: 'emailLogs',
// });



export default User;
