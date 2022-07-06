import React from "react";
import Card from "../Card/Card";


export default function Cards({currentDogs}) {
    return(
        <div>
            {
                currentDogs.length && currentDogs.map((el) => {
                    return(
                        <Card 
                            key={el.id}
                            id={el.id}
                            name={el.name}
                            image={el.image}
                            temperament={el.temperament}
                            weight_min={el.weight_min}
                            weight_max={el.weight_max}
                        />
                    )
                })
            }
        </div>
    )
}