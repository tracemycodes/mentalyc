const express = require('express');
const multer = require('multer');
const uploadAudio = require('../aws/aws')
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// @route     GET api/auth
// @desc      get all audio recordings
// @access    public
router.get('/', async (req, res) => {
  try {
    //   const user = await User.findById(req.user.id).select('-password');
    res.json({ user: 'user' });
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// @route     POST api/auth
// @desc      save session recordings
// @access    public
router.post('/', upload.single('audio'), async (req, res) => {
  try {
    const { name, title, audio } = req.body; // Access other form fields

    const audioFile = req.file; // Access the uploaded audio file

    // console.log('audioFile');
    const link = await uploadAudio(`${name} ${audioFile.fieldname}`, "mentalyc", audioFile.buffer)

    res.json({ user: 'user' });
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
