module.exports = (sequelize, DataTypes) => {
    const Token = sequelize.define("Token", { // Correction : .define
        userId: {
            type: DataTypes.UUID, // Correction : 'type', pas 'DataTypes'
            allowNull: false
        },
        token: {
            type: DataTypes.STRING(500), // Correction : 'type', pas 'DataTypes'
            allowNull: false,
        },
        expireDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: () => {
                const now = new Date();
                // Expire dans 30 jours
                return new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
            }
        }
    }, {
        tableName: "Token",
        indexes: [{
            unique: true,
            fields: ['token']
        }]
    });

    Token.associate = (models) => {
        Token.belongsTo(models.User, {
            foreignKey: 'userId'
        });
    };

    return Token;
};