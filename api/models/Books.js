module.exports = (sequelize, DataTypes) => {
    const Books = sequelize.define("Books", { // Correction : .define
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING(100), // STRING est plus adapté que TEXT pour un titre
            allowNull: false
        },
        author: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        editingYear: {
            type: DataTypes.INTEGER, // Correction : INTEGER
            allowNull: true
        },
        size: {
            type: DataTypes.INTEGER, // Correction : INTEGER
            allowNull: true
        },
        repositoryBy: {
            type: DataTypes.STRING(50) // Correction : type
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        tableName: "Books",
        timestamps: true
    });

    Books.associate = (models) => {
        Books.belongsTo(models.User, {
            foreignKey: "userId"
        });
    };
    return Books;
};