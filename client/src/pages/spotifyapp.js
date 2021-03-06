import React, { Component } from 'react';
import './spotifyapp.css';
import Spotify from '../util/Spotify';
import SearchBar from '../components/SearchBar/SearchBar';
import SearchResults from '../components/SearchResults/SearchResults';
import PlayList from '../components/PlayList/PlayList';


class SpotifyApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "searchResults": [],
      "playlistName": "New Playlist",
      "playlistTracks": []
    };
    this.addTrack = this.addTrack.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (!tracks.find(trackIndex => trackIndex.id === track.id)) {
      tracks.push(track);
      this.setState({playlistTracks: tracks});
    }
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    let newTracks = tracks.filter(trackIndex => trackIndex.id !== track.id);
    this.setState({playlistTracks: newTracks});

  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist() {
    let tracks = this.state.playlistTracks;
    if(tracks.length && this.state.playlistName) {
      let trackURIs = tracks.map(trackIndex => trackIndex.uri);
      Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
        this.setState({
          playlistName: 'New Playlist',
          playlistTracks: []
        });
        document.getElementById('Playlist-name').value = this.state.playlistName;
      });
    }
  }

  search(searchTerm) {
    Spotify.search(searchTerm).then(results => {
      this.setState({searchResults: results});
    });
  }

  render() {
    return (
      <div>
        <h1>GEO<span className="highlight">JAM</span>MER</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <PlayList playlistName={this.state.playlistName} onRemove={this.removeTrack} playlistTracks={this.state.playlistTracks}  onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default SpotifyApp;
