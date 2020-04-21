import React, { Component } from 'react';
const $ = require('jquery');
import Spotify from 'spotify-web-api-js';


const spotifyWebApi = new Spotify();

export class App extends Component {
    constructor(props){
        super();
        
        if (props.accesstoken) {
            spotifyWebApi.setAccessToken(props.accesstoken);
        }

        this.state = {
          loggedIn: props.accesstoken ? true : false,
          isPlaying: false, 
          nowPlaying: { 
            name: 'Not Checked', 
            albumArt: '' 
          },
          savedTracks: [],
          totalTracks: 0
        }
        
      }

      componentDidMount() {
        console.log('did mount')
        this.getNowPlaying()
      }
     
      getNowPlaying(){
        spotifyWebApi.getMyCurrentPlaybackState()
          .then((response) => {
            this.setState({
              nowPlaying: { 
                  name: response.item.name, 
                  albumArt: response.item.album.images[0].url
                },
                isPlaying: response.is_playing
            });
          })
      }

      play() {
        spotifyWebApi.play()
        this.setState({isPlaying: true})
      }

      pause() {
        spotifyWebApi.pause()
        this.setState({isPlaying: false})
      }

      previous() {
        spotifyWebApi.skipToPrevious()
        setTimeout(() => {
          this.getNowPlaying()
        }, 500);
      }

      next() {
        spotifyWebApi.skipToNext()
        setTimeout(() => {
          this.getNowPlaying()
        }, 500);

      }

      playPause() {
        if(this.state.isPlaying)
        {
          this.pause()
        } else {
          this.play()
        }
      } 

      getMySavedTracks() {
        spotifyWebApi.getMySavedTracks()
          .then((response) => {
            this.setState({ 
              savedTracks: response.items,
              totalTracks: response.total
            })
          })
          var offset = 20
          var pages = Math.ceil(this.state.totalTracks / offset)
          var currentPosition = 20
          for(let i=1; i<=pages; i++) {
            currentPosition += 20
            
            spotifyWebApi.getMySavedTracks({
              offset: currentPosition
            }).then((response) => {
              var newSavedTracksState = [...this.state.savedTracks, ...response.items ]
              
              this.setState({ 
                savedTracks: newSavedTracksState
              })
              
              newSavedTracksState = []
            })
          }
      }

      saveTracksToDB() {
        $.ajax({
          method: "POST",
          url: "{{ path('spotify_set') }}",
          //url: "../../src/Controller/SpotifyController.php",
          data: {
            savedTracks: this.state.savedTracks
          },
          success:function(result) {
            console.log('done')
          }
        })
      }

      renderSavedTracks() {
        
        return(
          <table style={{ border: 1 }}>
            {this.state.savedTracks.map((song) =>
              <tr key={song.track.id}>
                <td>{song.track.name}</td>
                <td>
                  {song.track.artists.map((artist) =>
                      { return artist.name }
                  )}
                </td>
                <td>{song.track.album.name}</td>
                <td>{song.track.popularity}%</td>
              </tr>
            )}
          </table>
        )
      }

      render() {
        return (
          <div className="App">
            <a href='http://localhost:8888' > Login to Spotify </a>
            <div>
              Now Playing: { this.state.nowPlaying.name }
            </div>
            <div>
              <img src={this.state.nowPlaying.albumArt} style={{ height: 500 }}/>
            </div>
            { this.state.loggedIn &&
              <div>
                <div>
                  <button onClick={() => this.getNowPlaying()}>
                    Check Now Playing
                  </button>
                  <button onClick={() => this.getMySavedTracks()}>
                    Saved tracks
                  </button>
                  <button onClick={() => this.previous()}>
                    Previous
                  </button>
                  <button onClick={() => this.playPause()}>
                    Play / Pause
                  </button>
                  <button onClick={() => this.next()}>
                    Next
                  </button>
                  <button onClick={() => this.saveTracksToDB()}>
                    Save
                  </button>
                </div>
                <div>
                  { this.renderSavedTracks() }
                </div>
              </div>
            }
          </div>
        );
      }
}