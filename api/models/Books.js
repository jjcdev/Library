module.exports = (sequelize, DataTypes) => {
    const Books = sequelize.defined("Books", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        title: {
            type: DataTypes.TEXT(30),
            allowNull: false
        },
        author: {
            type: DataTypes.TEXT(15),
            allowNull: true,
        },
        editingYear: {
            type: DataTypes.INT(200),
            allowNull: true
        },
        size: {
            type: DataTypes.INT(10),
            allowNull: true
        },
        repositoryBy: {
            typ: DataTypes.TEXT(30)
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, { tableName: "Books" })
    Books.associate = (models) => {
        Books.belongsTo(models.Users, {
            foreignKey: "id"
        })
    }
    return Books
}