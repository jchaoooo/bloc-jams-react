import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';
import './../styles/Album.css';

class Album extends Component {
  constructor(props) {
    super(props);
    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      currentTime: 0,
      duration: album.songs[0].duration,
      currentVolume: 0.8,
      isPlaying: false,
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.formatTime = this.formatTime.bind(this);
  }

  componentDidMount() {
    this.eventListeners = {
      timeupdate: e => {
        this.setState({ currentTime: this.audioElement.currentTime });
      },
      durationchange: e => {
        this.setState({ duration: this.audioElement.duration });
      },
      volumechange: e => {
        this.setState({ currentVolume: this.audioElement.volume })
      }
    };
    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.addEventListener('volumechange', this.eventListeners.volumechange);
  }

  componentWillUnmount() {
    this.audioElement.src = null;
    //temporarily removed to fix bug, seems like it's working. 180608
    //this.audioElement = null;
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.removeEventListener('volumechange', this.eventListeners.volumechange);
  }

  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true })
  }

  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false })
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause()
    } else {
      if (!isSameSong) { this.setSong(song); }
      this.play();
    }
  }

  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex -1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  handleNextClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.min(currentIndex + 1, this.state.album.songs.length -1)
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime });
  }

  handleVolumeChange(e) {
    const newVolume = e.target.value;
    this.audioElement.volume = newVolume;
    this.setState({ currentVolume: newVolume })
  }

  onMouseEnter(e, song) {
    if (this.state.isPlaying && this.state.currentSong === song) {
      e.target.className = "ion-md-pause"
    } else {
      e.target.className = "ion-md-play"
    }
  }

  onMouseLeave(e) {
    e.target.className = "song-number"
  }

  playPause(e, song) {
    if (this.state.isPlaying && this.state.currentSong === song) {
      e.target.className = "ion-md-play"
    } else {
      e.target.className = "ion-md-pause"
    }
  }

  formatTime(time) {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    if (isNaN(time)) {
      return '-:--'
    }
    if (sec < 10) {
      return min.toString() + ':0' + sec.toString()
    } else {
      return min.toString() + ':' + sec.toString()
    }
  }


  render() {
    return(
      <section className="album">
        <section id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title} />
          <PlayerBar
            isPlaying={this.state.isPlaying}
            currentSong={this.state.currentSong}
            currentTime={this.audioElement.currentTime}
            duration={this.audioElement.duration}
            currentVolume={this.state.currentVolume}
            handleSongClick={() => this.handleSongClick(this.state.currentSong)}
            handlePrevClick={() => this.handlePrevClick()}
            handleNextClick={() => this.handleNextClick()}
            handleTimeChange={(e) => this.handleTimeChange(e)}
            handleVolumeChange={(e) => this.handleVolumeChange(e)}
            formatTime={(time) => this.formatTime(time)}
           />
        </section>
        <section className="album-description">
          <div className="album-details">
            <h1 id="album-title">{this.state.album.title}</h1>
            <h2 className="artist">{this.state.album.artist}</h2>
            <div id="release-info">{this.state.album.releaseInfo}</div>
          </div>
          <table id="song-list">
            <colgroup>
              <col id="song-number-column" />
              <col id="song-title-column" />
              <sol id="song-duration-column" />
            </colgroup>
            <tbody>
              {this.state.album.songs.map( (song, index) =>
                <tr className="song" key={ index } onClick={() => this.handleSongClick(song)}>
                  <td className="song-number"
                    onMouseEnter={(e) => this.onMouseEnter(e, song)}
                    onMouseLeave={(e) => this.onMouseLeave(e)}
                    onClick={(e) => this.playPause(e, song)}>
                          { index + 1 }. {song.title} {this.formatTime(song.duration)}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
         </section>
      </section>
    );
  }
}

export default Album;
