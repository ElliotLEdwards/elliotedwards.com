import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './spotify-controls';
import $ from 'jquery';

$(function ()
{
    const $spotifyControls = $('.spotify-controls');
    
    $spotifyControls.each((k, e) =>
    {
        ReactDOM.render((
            <React.StrictMode>
                <App
                    test={$(e).data('spotify-test')}
                    accesstoken={$(e).data('spotify-accesstoken')}
                    refreshtoken={$(e).data('spotify-refreshtoken')}
                />
            </React.StrictMode>
        ),
            e
        );
    });
});