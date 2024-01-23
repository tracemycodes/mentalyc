const express = require('express');
const multer = require('multer');
const uploadAudio = require('../aws/aws');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const SessionSchema = require('../model/session');
const session = require('../model/session');

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
    const { name, title } = req.body; // Access other form fields

    const audioFile = req.file; // Access the uploaded audio file

    const audioId = uuidv4();

    const session = new SessionSchema({
      name: name,
      title: title,
      audioName: audioFile.originalname,
      audioId: audioId,
      audioDuration: '',
    });

    const savedSession = await session.save();

    // const savedSession = await session.findById('65aff7462126bf641cd9153d')

    if (savedSession) {
      res.status(201).json({
        status: 'success',
        data: {
          id: savedSession.id,
          name: savedSession.name,
          title: savedSession.title,
          sessionStatus: savedSession.sessionStatus,
          uploadStatus: savedSession.uploadStatus,
          audio: {
            name: savedSession.audioName,
            duration: savedSession.audioDuration,
            id: savedSession.audioId,
            url: savedSession.audioUrl,
          },
        },
        message: 'Session saved successfully.',
      });
      await uploadAudio(audioId, audioFile.buffer);
    } else {
      res.status(500).json({
        status: 'error',
        error: {
          message: 'Failed to save the session.',
          details: 'An error occurred while processing the request.',
        },
      });
    }
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
