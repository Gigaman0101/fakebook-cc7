module.exports = (sequelize, DataTypes) => {
    const Friend = sequelize.define("Friend", {
        status: {
            type: DataTypes.ENUM("FRIEND", "PENDING", "BLOCK"),
            allowNull: false,
        }
    }, {
        tableName: "friends",
        timestamps: false
    });


    Friend.associate = models => {
        Friend.belongsTo(models.User, { foreignKey: "request_to_id" });
        Friend.belongsTo(models.User, { foreignKey: "request_by_id" });
    }


    return Friend;
}