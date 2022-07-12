import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { filterByTemt, getDogs, getTemperaments, orderByName, orderByWeight } from "../../redux/actions";
import Cards from "../Cards/Cards";
import NavBar from "../NavBar/NavBar";
import Paged from "../Paged/Paged";
import style from "./Home.module.css";

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

    function handleClick(e) {
        e.preventDefault();
        dispatch(getDogs());
    }

    function handleFilterSortName(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrder(e.target.value);
    }

    function handleWeight(e) {
        e.preventDefault();
        dispatch(orderByWeight(e.target.value));
        setCurrentPage(1);
        setOrder(e.target.value);
    }

    function handleFilterTemp(e){
        e.preventDefault();
        dispatch(filterByTemt(e.target.value));
        setCurrentPage(1);
    }

    useEffect(() => {
        dispatch(getDogs());
        dispatch(getTemperaments());
    }, [dispatch]);

    return(
        <div className={style.homeContainer}>
            <div className={style.divNavBar}>
                <ul className={style.navBar}>
                    <li>
                        <button onClick={e => { handleClick(e) }} className={style.allElements}>Home</button>
                    </li>
                    <li>
                        <Link to='/create'>
                            <button className={style.allElements}>Create Breed</button>
                        </Link>
                    </li>
                    <li className={style.elements}>
                        <select onChange={(e) => handleFilterSortName(e)}>
                            <option hidden className={style.allElements}>Sort breed by name</option>
                            <option value="asc">A - Z</option>
                            <option value="desc">Z - A</option>
                        </select>
                    </li>
                    <li className={style.elements}>
                        <select onChange={ handleWeight}>
                            <option hidden className={style.allElements}>Sort weight by value</option>
                            <option value="min">Lower Weight</option>
                            <option value="max">Higher weight</option>
                        </select>
                    </li>
                    <li className={style.elements}>
                        <select onChange={(e) => handleFilterTemp(e)}>
                        <option value='all' disabled selected>All temperament</option>
                            {
                            temperaments.map((t, index) => <option key={index} value={t.name}>{t.name}</option>)
                        }
                        </select>
                    </li>
                    <li>
                        <NavBar setCurrentPage={setCurrentPage} />
                    </li>
                </ul>
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