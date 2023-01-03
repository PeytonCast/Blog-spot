const { User } = require('../models');
// this is the seeding for the content and the content is basicly an article
// so we have the articles' title, text, date, and the user who wrote it
// extra comment
const userData = [
    {
       username: "C_Engineer",
       password: "They-C-Me-Coding"
    },
    {
      username: "Java_Lava",
      password: "$2b$10$PVVGC86CcDxNcejqbC3OrOwoiTP2tF.O2F/j83xT6v3PsH/MdNdLS"
     },
    {
      username: "angry.Coder",
      password: "I_<3_Coding"
    }

];

const seedUser = () => User.bulkCreate(userData);
module.exports = seedUser;
