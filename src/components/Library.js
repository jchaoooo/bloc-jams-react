import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';
import './../styles/Library.css';

class Library extends Component {
  constructor(props) {
    super(props);
    this.state = {albums: albumData }
  }
  render() {
    return(
      <section className="library-row">
      {
        this.state.albums.map( (album, index) =>
          <div key={ index } className="library-column">
          <Link to={`/album/${album.slug}`} key={index} className="album-cover">
            <img src={album.albumCover} alt={album.title} />
            <div className="album-title">{album.title}</div>
            <div className="album-artist">{album.artist}</div>
            <div>{album.songs.length} songs</div>
          </Link>
          </div>
        )
      }
      </section>
    );
  }
}

export default Library;
