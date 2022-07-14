import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getDogs, getTemperaments } from "../../redux/actions";
import style from "./NotFound.module.css";


const NotFound = () => {
    const dispatch = useDispatch();

    function handleClick(e) {
        e.preventDefault();
        dispatch(getDogs());
        dispatch(getTemperaments());
    }

    return (
        <div className={style.img}>
            <h1 className={style.texto}>Breed doesn't exist</h1>
            <br /> <br />
            <img src="https://c.tenor.com/Gbnib9PB0xUAAAAC/laughing-laugh.gif" alt="breed" className={style.breed} />
            <div>
                <Link to="/home">
                    <button onClick={(e) => handleClick(e)} className={style.button}>Back</button>
                </Link>
            </div>
        </div>
    )
}

export default NotFound;