import React, { Component } from 'react';
const $ = require('jquery');
import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify();

export class App extends Component {
    constructor(props){
        super();
        const params = this.getHashParams();
        const token = props.accesstoken;
       
        if (token) {
            spotifyWebApi.setAccessToken(token);
        }
        this.state = {
          loggedIn: token ? true : false,
          nowPlaying: { name: 'Not Checked', albumArt: '' }
        }
      }
      getHashParams() {
        
        var hashParams = {};
        
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        e = r.exec(q)
        
        while (e) {
           hashParams[e[1]] = decodeURIComponent(e[2]);
           e = r.exec(q);
        }
        console.log(hashParams)
        return hashParams;
      }
    
      getNowPlaying(){
        spotifyWebApi.getMyCurrentPlaybackState()
          .then((response) => {
            this.setState({
              nowPlaying: { 
                  name: response.item.name, 
                  albumArt: response.item.album.images[0].url
                }
            });
          })
      }
      render() {
        return (
          <div className="App">
            <a href='http://localhost:8888' > Login to Spotify </a>
            <div>
              Now Playing: { this.state.nowPlaying.name }
            </div>
            <div>
              <img src={this.state.nowPlaying.albumArt} style={{ height: 150 }}/>
            </div>
            { this.state.loggedIn &&
              <button onClick={() => this.getNowPlaying()}>
                Check Now Playing
              </button>
            }
          </div>
        );
      }
}