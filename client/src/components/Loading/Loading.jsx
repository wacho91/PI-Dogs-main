import React from "react";
import style from "./Loading.module.css";

export default class Loading extends React.Component{
    render(){
        return(
            <div className={StyleSheet.container}>
                <div className={StyleSheet.aux}>
                    <img src="https://revistas.ecr.edu.co/public/site/loading.gif" alt="Okay" className={style.img} />
                    {/* <h3 className={style.loading}>Loading...</h3> */}
                </div>
            </div>
        )
    }
}