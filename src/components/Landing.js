import React from 'react';
import './../styles/Landing.css';



const Landing = () => (
  <section className="landing">
    <h1 className="hero-title">TURN THE MUSIC UP!</h1>

  <section className="selling-points">
    <div className="point">
      <img src={require("./../images/music_icon.png")} alt="music_icon" width="60"/>
      <h2 className="point-title">Choose your music</h2>
      <p className="point-description">The world is full of music; why should you have to listen to music that someone else chose?</p>
    </div>
    <div className="point">
      <img src={require("./../images/stream_icon.png")} alt="stream_icon" width="60" />
      <h2 className="point-title">Unlimited, streaming, ad-free</h2>
      <p className="point-description">No arbitrary limits. No distractions.</p>
    </div>
    <div className="point">
      <img src={require("./../images/mobile_icon.png")} alt="mobile_icon" width="60" />
      <h2 className="point-title">Mobile enabled</h2>
      <p className="point-description">Listen to your music on the go. This streaming service is available on all mobile platforms.</p>
    </div>
  </section>
  </section>
);

export default Landing;
