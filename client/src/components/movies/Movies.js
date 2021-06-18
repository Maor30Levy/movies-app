import React from 'react'
import ComingSoon from './ComingSoon'
import NowPlaying from './NowPlaying'

export default function Movies() {
    return (
        <div className="movies__container">
            <NowPlaying />
            <ComingSoon />
            <NowPlaying />
            <ComingSoon />
        </div>
    )
}
