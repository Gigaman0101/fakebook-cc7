module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        profile_url: {
            type: DataTypes.STRING(6000),
            allowNull: false,
        }

    }, {
        tableName: "users",
        timestamps: false
    });


    User.associate = models => {
        User.hasMany(models.Post, { foreignKey: "user_id" });
        User.hasMany(models.Comment, { foreignKey: "user_id" });
        User.hasMany(models.Friend, { foreignKey: "request_to_id" });
        User.hasMany(models.Friend, { foreignKey: "request_by_id" });
        // User.belongsToMany(models.USer, {})
    }


    return User;
}