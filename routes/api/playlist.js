const express = require("express");

const router = express.Router();

const Playlist = require('../../databas/models/playlist');
const passport = require('../../passport');

router.post('/', (req, res) => {
    const { playlistName, coordinates } = req.body;

    Playlist.findOne({ playlistName: playlistName}, (err, playlist) => 
        if (err) {
            console.log('Error Creating Playlist', err);
            return;
        }

if (playlist) {
    res.json({
        error: 'Sorry, there is already a playlist associated with the location: ${playlistName}',
    });
    return;
}

const newPlaylist = new Playlist({
    playlistName = playlistName,
    coordinates = coordinates,
});

// newPlaylist.save((err, savedPlaylist) => {
//     iff (err) return res.json(err);

//     res.json(savedPlaylist);
// });

});

router.get('/', (req, res) => {
    if (req.playlist) {
      res.json({ playlistname: req.playlistName });
    } else {
      res.json({ playlistName: null });
    }
  });

  module.exports = router;