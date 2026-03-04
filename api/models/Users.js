module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.defined(Users, {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIV4D,
            primaryKey: true
        },
        lastName: {
            type: DataTypes.TEXT(10),
            allowNull: false
        },
        firstName: {
            type: DataTypes.TEXT(10),
            allowNull: true
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, { tableName: "Users" })
    Users.associate = (models) => {
        Users.hasMany(models.Books, {
            foreignKey: "id"
        })
    }
    return Users

}