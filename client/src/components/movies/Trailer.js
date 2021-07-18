import React from 'react';

export default function Trailer({ trailer }) {
    return (
        <iframe className="trailer" src={trailer} title="movie trailer from youtube"
            frameborder="0" allowfullscreen>
        </iframe>
    )
}
