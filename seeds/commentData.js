const { Comment } = require('../models');
// this is the seeding for the content and the content is basicly an article
// so we have the articles' title, text, date, and the user who wrote it
const commentData = [
    {
       text: "I'm so excited!",
       content_id: 1
    },
    {
        text: "I prefer classes.",
        content_id: 2
     },
     {
        text: "this is so convenent",
        content_id: 3
     }

];

const seedContent = () => Comment.bulkCreate(commentData);

module.exports = seedContent;
