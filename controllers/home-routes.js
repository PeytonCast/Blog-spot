const router = require('express').Router();
const { text } = require('express');
const { Comment, Content, User } = require('../models');

// GET all content for homepage
router.get('/', async (req, res) => {
  try {
    const dbContentData = await Content.findAll({
      include: [{model: Comment, attributes: ['text', 'commented_user']}]});

    // maps data for handlebars
    // const contents = dbContentData.map((content) =>
    //   content.get({ plain: true })
    // );
    // res.render('homepage', {
    //   contents,
    //   loggedIn: req.session.loggedIn,
    // });
    res.json(dbContentData) 
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// GET a specific artical
router.get('/content/:id', async (req, res) => {
    try {
      const dbContentData = await Content.findByPk(req.params.id, {
        include: [{model: Comment}],
      });
  
    //   const content = dbContentData.get({ plain: true });
    //   res.render('content', { content, loggedIn: req.session.loggedIn });
     res.json(dbContentData)
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  
 
  
  // Login route
  router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('login');
  });
  
module.exports = router;
  