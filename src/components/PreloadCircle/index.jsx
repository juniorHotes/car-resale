import React, { useEffect, useRef } from 'react'
import './styles.css'

export default function PreloadCircle({ preload }) {
    const preloadRef = useRef(null)

    useEffect(() => {
        preloadRef.current.parentElement.style.position = "relative"
    }, [])

    return (
        <div className={`preload-overlay ${preload && 'active'}`} ref={preloadRef}>
            <div className={`preloader-wrapper big ${preload && 'active'}`}>
                <div className="spinner-layer spinner-green-only">
                    <div className="circle-clipper left">
                        <div className="circle"></div>
                    </div>
                    <div className="gap-patch">
                        <div className="circle"></div>
                    </div>
                    <div className="circle-clipper right">
                        <div className="circle"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}