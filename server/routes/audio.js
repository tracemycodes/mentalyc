const express = require('express');
const router = express.Router();


// @route     GET api/auth
// @desc      get all audio recordings
// @access    public
router.get('/', async (req, res) => {
    try {
    //   const user = await User.findById(req.user.id).select('-password');
      res.json({user: 'user'});
    } catch (error) {
      res.status(500).send('Server Error');
    }
});


module.exports = router;