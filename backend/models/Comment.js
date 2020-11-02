module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define("Comment", {
        comment: DataTypes.STRING(1000)
    }, {
        tableName: "comments",
        timestamps: true
    });

    Comment.associate = models => {
        Comment.belongsTo(models.User, { foreignKey: "user_id" });
        Comment.belongsTo(models.Post, { foreignKey: "post_id" });
    }

    return Comment;
}