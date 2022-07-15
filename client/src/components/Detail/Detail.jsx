import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { cleanDog, deleteDog, getDogById } from "../../redux/actions";
import Loading from "../Loading/Loading";
import style from "./Detail.module.css";


export default function Detail() {
    const dispatch = useDispatch();
    const dog = useSelector((state) => state.details)
    const { id } = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        dispatch(getDogById(id));
    },[dispatch, id]);

    function handleCleanDog() {
        dispatch(cleanDog());
    }

    function handleDeleteDog() {
        if(dog[0].createdInDb) {
            dispatch(deleteDog(id));
            dispatch(cleanDog());
            alert("Dog deleted");
            navigate("/home");
        }
        else alert("Dog not created in database");
    }

    if(!dog[0]) {
        return <Loading />
    } else {
        return(
            <div className={style.mainContainer}>
                <button className={style.dogDelete} onClick={() => handleDeleteDog()}>Delete</button>
                <div className={style.detailContainer}>
                <img className={style.img} src={dog[0].image} alt="img not found"/>
                    <div>
                        <h1>{dog[0].name}</h1>
                        
                        <h4>Height: {dog[0].height_min} - {dog[0].height_max}</h4>
                        
                        <h4>Weight: {dog[0].weight_min} - {dog[0].weight_max}</h4>
                        
                        <h4>Life span: {dog[0].life_span}</h4>
                       
                        <h4>Temperaments: {
                            dog[0].createdInDb? 
                            dog[0].temperaments.map(el => el.name + (' ')) : 
                            dog[0].temperament? 
                            dog[0].temperament + ' ' : 
                            " None"
                        }</h4>
                    </div>
                </div>
                <Link to='/home'>
                    <button className={style.btn} onClick={() => handleCleanDog()}>Back</button>
                </Link>
            </div>
        )
    }

    // return (
    //     <div>
    //         {/* <div>
    //             <Link to='/home'>
    //                 <button onClick={handleCleanDog}>Back</button>
    //             </Link>
    //             <h1>{dog[0].name}</h1>
    //             <img src={dog[0].image} alt="breed without img" />
    //             <h4>Height: {dog[0].height_min} - {dog[0].height_max}</h4>
    //             <h4>Weight: {dog[0].weight_min} - {dog[0].weight_max}</h4>
    //             <h4>{dog[0].temperament ? `Temperament: ${Array.isArray(dog[0].temperament) ? dog[0].temperament.map(t => t.name).join(', ') : dog[0].temperament}` : ``}</h4>
    //             <h4>Life span: {dog[0].life_span}</h4>
    //         </div> */}

    //         {
    //         dog.length > 0? 
    //             <div>
    //                 <h2 >{dog[0].name}</h2>
    //                 <img src={dog[0].image? dog[0].image : dog[0].imagen} alt="Not found"></img>
    //                 <p> Height: {dog[0].height_min}(Cm) - {dog[0].height_max}(Cm)</p>
    //                 <p> Weight: {dog[0].weight_min}(Kg) - {dog[0].weight_max}(Kg)</p>
    //                 <p> Life Span: {dog[0].life_span} age</p>
    //                 <p>{dog?.temperament}</p>
    //                 <h4>Temperaments:</h4>
    //                <div>
    //                {
    //                     dog.temperament?.map(d => {
    //                         return (
    //                             d.name ? <h2 key={d.name}>{d.name.toUpperCase()}</h2> :  <h2 key={d}>{d}</h2>
    //                         )
    //                     }
    //                     )
    //                 }
    //                </div>
    //                 {/* <h1>{dog[0].name}</h1>
    //                 <img src={dog[0].image} alt="breed without img" />
    //                 <h4>Height: {dog[0].height_min}(Cm) - {dog[0].height_max}(Cm)</h4>
    //                 <h4>Weight: {dog[0].weight_min}(Kg) - {dog[0].weight_max}(Kg)</h4>
    //                 <h4>{dog[0].temperament ? `Temperament: ${Array.isArray(dog[0].temperament) ? dog[0].temperament.map(t => t.name).join(', ') : dog[0].temperament}` : ``}</h4>
    //                 <h4>Life span: {dog[0].life_span}</h4> */}
    //             </div> : 
    //         <h2>Loading...</h2>
    //         } 
    //         <div>
    //             <Link to= '/home'><button onClick={(e) => handleCleanDog(e)}>Back</button></Link>
    //         </div>
    //     </div>
    // )

    
}