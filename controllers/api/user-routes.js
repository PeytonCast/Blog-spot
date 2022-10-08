const router = require('express').Router();
const { User, Comment, Content } = require('../../models');

// CREATE new user
router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      password: req.body.password,
      
    });
    
    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(201).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login
router.post('/login', async (req, res) => {
    try {
      const dbUserData = await User.findOne({
        where: {
          username: req.body.username,
        },
      });
  
      if (!dbUserData) {
        res
          .status(400)
          .json({ message: 'Incorrect username or password. Please try again!' });
        return;
      }
  
      const validPassword = await dbUserData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password. Please try again!' });
        return;
      }
  
      req.session.save(() => {
        req.session.loggedIn = true;
        req.session.userId = dbUserData.id;

  
        res
          .status(200)
          .json({ user: dbUserData, message: 'You are now logged in!' });
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

// post a new article 
router.post('/post', async (req, res) => 
{
    try {
        const sendData = await Content.create({
          title: req.body.title,
          text: req.body.text,
          user_id: req.session.userId
        })
        res.status(201).json(sendData);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
});

router.post('/comment', async (req, res) => 
{if (!req.session.loggedIn){
    res.redirect('/login')
    res.render('login');
   } else{
    try {
        const sendData = await Comment.create({
          text: req.body.text,
          content_id: req.body.content_id,
          commented_user: req.session.userId
        })
        res.status(201).json(sendData);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
}});
// update content
router.put('/:id', async (req, res) => {

    try {
      
      // checks to see if the content to be updated belongs to user
      const checkId = await Content.findByPk(req.params.id)
      const content = checkId.get({ plain: true });
      
      if (content.user_id != req.session.userId){
        return
       } 
       else{
        const updateData = await Content.update(
        {
            title: req.body.title,
            text: req.body.text
        },
        {where: {
            id: req.params.id,
          }
        })
        res.status(200).json({updateData, message: 'article successfuly updated' });
        
    }} catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

// delete content
router.delete('/:id', async (req, res) => {
    try {
      // checks to see if the content to be deleted belongs to user
      const checkId = await Content.findByPk(req.params.id)
      const content = checkId.get({ plain: true });
      
      if (content.user_id != req.session.userId){
        return
       } 
       else{
        const deleteData = await Content.destroy({where: {id: req.params.id}})
        res.status(200).json({deleteData});
        
    }} catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})


//logout
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
});



module.exports = router;
