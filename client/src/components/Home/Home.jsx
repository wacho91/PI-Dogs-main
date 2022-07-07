import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, getTemperaments, orderByName } from "../../redux/actions";
import Cards from "../Cards/Cards";
import Paged from "../Paged/Paged";


export default function Home() {
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs);
    const temperaments = useSelector((state) => state.temperaments);

    //Paginacion
    const [currentPage, setCurrentPage] = useState(1);
    const [dogsPerPage] = useState(8);
    let indexOfLastDog = currentPage * dogsPerPage;
    let indexOfFirstDog = indexOfLastDog - dogsPerPage;
    let currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);

    const [, setOrder] = useState('');

    const paged = (numPage) => {
        setCurrentPage(numPage);
    }

    function handleFilterSortName(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrder(e.target.value);
    }

    useEffect(() => {
        dispatch(getDogs());
        dispatch(getTemperaments());
    }, [dispatch]);

    return(
        <div>

            <div>
                <li>
                    <select onChange={(e) => handleFilterSortName(e)}>
                        <option value="deafult" hidden>Sort breed by name</option>
                        <option value="asc">A - Z</option>
                        <option value="desc">Z - A</option>
                    </select>
                </li>
            </div>


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