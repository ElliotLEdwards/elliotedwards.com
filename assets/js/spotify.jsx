import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './spotify-controls';
import $ from "jquery";

$(function ()
{
    const $spotifyControls = $('.spotify-controls');
    
    $spotifyControls.each((k, e) =>
    {
        console.log(e)
        ReactDOM.render((
            <React.StrictMode>
                <App
                    test={$(e).data('spotify-test')}
                    accessToken={$(e).data('spotify-access-token')}
                    refreshToken={$(e).data('spotify-refresh-test')}
                />
            </React.StrictMode>
        ),
            e
        );
    });
});