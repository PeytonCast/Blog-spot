const { Comment } = require('../models');
// this is the seeding for the content and the content is basicly an article
// so we have the articles' title, text, date, and the user who wrote it
const commentData = [
    {
       text: "I'm so excited!",
       date: "December 22, 2021 20:30:00",
       content_id: 1
    },
    {
        text: "I prefer classes.",
        date: "September 15, 2022 20:20:00",
        content_id: 2
     },
     {
        text: "this is so convenent",
        date: "January 26, 2022 10:30:00",
        content_id: 3
     }

];

const seedContent = () => Comment.bulkCreate(commentData);

module.exports = seedContent;
