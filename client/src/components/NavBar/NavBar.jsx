import React from "react";
import { useDispatch } from "react-redux";
import { getDogsByName } from "../../redux/actions";
import style from "./NavBar.module.css";

export default function NavBar({setCurrentPage}) {
    const [breed, setBreed] = React.useState("");
    const dispatch = useDispatch();

    function handleOnChange(e) {
        e.preventDefault();
        setBreed(e.target.value);
    }

    function handleOnSubmit(e) {
        e.preventDefault();
        dispatch(getDogsByName(breed));
        setCurrentPage(1);
        setBreed("");
    }

    return (
        <div className={style.divContainer}>
            <form onSubmit={handleOnSubmit}>
                <input
                    type="text"
                    placeholder="Search by breed"
                    value={breed}
                    onChange={handleOnChange}
                />
                <button type="submit" className={style.searchButton}>Search</button>
            </form>
        </div>
    )
}