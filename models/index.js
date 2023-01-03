const User = require('./user');
const Content = require('./content');
const Comment = require('./comment');

// content has many comments
Content.hasMany(Comment, {
    foreignKey: 'content_id'
})
// comments belong to a speific content
Comment.belongsTo(Content, {
    foreignKey: 'content_id'
})

User.hasMany(Content, {
  foreignKey: "user_id"
})

Content.belongsTo(User, {
  foreignKey: "user_id"
})

User.hasMany(Comment, {
    foreignKey: "commented_user"
  })
  
Comment.belongsTo(User, {
    foreignKey: "commented_user"
  })
  
  
module.exports = { User, Comment, Content };
