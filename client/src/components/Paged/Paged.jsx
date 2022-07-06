import React from "react";
import style from "./Paged.module.css";


export default function Paged({ dogsPerPage, allDogs, paged }) {
    let numPage = [];
    for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
        numPage.push(i);
    };
    return (
        <nav className={style.container}>
            <ul>
                {
                    numPage.map(i =>
                        <button key={i} onClick={() => paged(i)} className={style.button}>{i}</button>
                    )
                }
            </ul>
        </nav>
    );
}