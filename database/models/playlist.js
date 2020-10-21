const mongoose = require("mongoose");

const Schema = mongoose.Schema;
mongoost.promise = Promise;

const playlistSchema = new Schema({
    playlistName: { type: String, unique: true },
    coordinates { type: String, unique: true },
});

playlistSchema.methods + {
    checkPlaylistName: function ()
}

const Playlist = mongoose.model("Playlist", playlistSchema);

module.exports = Playlist;