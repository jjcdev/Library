module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        lastName: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        tableName: "Users",
        indexes: [{
            unique: true,
            fields: ['email']
        }]
    });

    User.associate = (models) => {
        User.hasMany(models.Token, { foreignKey: 'userId', onDelete: 'CASCADE' });
        User.hasMany(models.Books, { foreignKey: 'userId', onDelete: 'CASCADE' });
    }

    return User;
};