import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, getTemperaments } from "../../redux/actions";
import Cards from "../Cards/Cards";
import Paged from "../Paged/Paged";


export default function Home() {
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs);
    const temperaments = useSelector((state) => state.temperaments);

    //Paginacion
    const [currentPage, setCurrentPage] = useState(1);
    const [dogsPerPage, setDogsPerPage] = useState(8);
    let indexOfLastDog = currentPage * dogsPerPage;
    let indexOfFirstDog = indexOfLastDog - dogsPerPage;
    let currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);

    const paged = (numPage) => {
        setCurrentPage(numPage);
    }

    useEffect(() => {
        dispatch(getDogs());
        dispatch(getTemperaments());
    }, [dispatch]);

    return(
        <div>


            <Paged  
                dogsPerPage={dogsPerPage}
                allDogs={allDogs.length}
                paged={paged}
            />
            
            {
                allDogs.length ? <Cards currentDogs={currentDogs} /> : <h1>Loading...</h1>
            }
        </div>
    )
}