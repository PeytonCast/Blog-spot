// content belongs to user
// a user can have many contents but a content can only have on user
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');
class Content extends Model {}
const saltRounds = 5;
Content.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
            
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'user',
              key: 'id',
            },
        },
    },
    {
        hooks: {
            async beforeCreate(newContent) {
                newContent.id = await bcrypt.hash(newContent.id, saltRounds);
              return newContent;
            },
          },
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'content',
    }
)
module.exports = Content