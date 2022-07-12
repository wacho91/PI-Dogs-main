import React from "react";
import { Link } from "react-router-dom";
import style from "./LandingPage.module.css";

export default function LandingPage() {
    return (
        <div className={style.divContainer}>
            <h1 className={style.title}>Welcome The Dog App</h1>
            <Link to='/home' style={{ textDecoration: 'none' }}>
                <button className={style.start}>GO</button>
            </Link>
        </div>
    )
}