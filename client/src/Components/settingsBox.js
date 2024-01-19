import React from "react"
import "./styles.css"

export default function Settingsbox() {
    return (
        <div className="settingsbox">
            <div className="group-262">
                <div className="group-394">
                    <button className="lightbox" onClick={() => { colorChange(0) }}>
                        <p className="light">Light</p>
                    </button>
                    <button className="darkbox" onClick={() => { colorChange(1) }}>
                        <p className="dark">Dark</p>
                    </button>
                </div>
                <div className="group-290">
                    <button className="cblightbox" onClick={() => { colorChange(2) }}>
                        <p className="colorblind-light">Colorblind Light</p>
                    </button>
                    <button className="cbdarkbox" onClick={() => { colorChange(3) }}>
                        <p className="colorblind-dark">Colorblind Dark</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

function colorChange(palette) {
    window.location.reload();
}