import React from "react";
import Card from "../Card/Card";
import style from "./Cards.module.css";


export default function Cards({currentDogs}) {
    return(
        <div className={style.container}>
            {
                currentDogs.length && currentDogs.map((el) => {
                    return(
                        <Card 
                            key={el.id}
                            id={el.id}
                            name={el.name}
                            image={el.image}
                            temperament={el.temperament || el.temperaments}
                            weight_min={el.weight_min}
                            weight_max={el.weight_max}
                        />
                    )
                })
            }
        </div>
    )
}