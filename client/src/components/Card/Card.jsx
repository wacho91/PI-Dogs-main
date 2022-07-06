import React from "react";
import { Link } from "react-router-dom";

export default function Card({id, name, image, temperament, weight_min, weight_max}) {
    return(
        <div>
            <Link to={`/home/${id}`}>
                <img src={image} alt="Breed without img" width='250px' height='250px' />
                <h4>{name}</h4>
                <h4>{`Weight: ${weight_min}Kg - ${weight_max}Kg`}</h4>
                
                <h5>{!Array.isArray(temperament) ? temperament :  temperament.map(t => t.name).join(', ')}</h5>
            
            </Link>
        </div>
    )
}