import React from "react";
import './Items.scss';
import SessionDelete from "../common/SessionDelete";

function GManners() {
    return (
        <div className="section">
            <SessionDelete></SessionDelete>
            <h3>준(작성한) 매너</h3>
            <div className="products">
                <div className="item"></div>
                <div className="item"></div>
            </div>
        </div>
    );
}

export default GManners;