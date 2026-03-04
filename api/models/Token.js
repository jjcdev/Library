module.exports = (sequelize, DataTypes) => {
    const Token = sequelize.defined("Token", {
        userId: {
            DataTypes: DataTypes.UUID,
            allowNull: false
        },
        token: {
            DataTypes: DataTypes.TEXT,
            allowNull: false,
            unique: true
        },
        expireDate: {
            type: DataTypes.DATE,
            allowNull: false,
            // C'est ici que la magie opère :
            defaultValue: () => {
                const now = new Date();
                return new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // Ajoute 30 jours
            }
        }
    }, {
        tableName: "Token",
    })
}