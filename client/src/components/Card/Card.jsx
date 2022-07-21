import React from "react";
import { Link } from "react-router-dom";
import style from "./Card.module.css";

export default function Card({id, name, image, temperament, weight_min, weight_max, origin}) {
  return(
    <div className={style.container}>
      <Link to={`/home/${id}`}  className={style.link}>
        <img className={style.img} src={image} alt="Breed without img" width='200px' height='200px' />
        <h4 className={style.text}>{name}</h4>
        <h4 className={style.text}>{origin}</h4>
        <h4 className={style.text}>{`Weight: ${weight_min}Kg - ${weight_max}Kg`}</h4>
        <h5 className={style.text}>{!Array.isArray(temperament) ? temperament :  temperament.map(t => t.name).join(', ')}</h5>
      </Link>
    </div>
  )
}