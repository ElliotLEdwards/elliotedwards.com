import React, { Component } from 'react';


export class App extends Component {
    constructor(){
        super();
        const params = this.getHashParams();
        this.state = {
            loggedIn: params.access_token,
            nowPlaying: {
                name: 'Not Checked',
                image: ''
            }
        }
    }


    getHashParams() {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while ( e = r.exec(q)) {
           hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;
    }

    render()
    {
        return (
            <>
                <h1>toto</h1>
            </>
        )
    }
}