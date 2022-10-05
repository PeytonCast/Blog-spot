const { User } = require('../models');
// this is the seeding for the content and the content is basicly an article
// so we have the articles' title, text, date, and the user who wrote it
const userData = [
    {
       username: "C_Engineer",
       email: "C.engineer@email.com",
       password: "They-C-Me-Coding"
    },
    {
      username: "Java_Lava",
      email: "Java_Lava.@email.com",
      password: "password"
     },
    {
      username: "angry.Coder",
      email: "angry.Coder@email.com",
      password: "I_<3_Coding"
    }

];

const seedUser = () => User.bulkCreate(userData);
module.exports = seedUser;
