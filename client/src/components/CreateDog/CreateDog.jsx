import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createDog, getTemperaments } from "../../redux/actions";

function validate(input) {
    let errors = {};

    if(!input.name) {
        errors.name = "Name is required";
    } else if(input.name.length < 3) {
        errors.name = "Name must be at least 3 characters";
    }

    if(!input.height_min) {
        errors.height_min = "Height is required";
    } else if(input.height_min < 0 || input.height_min > 100) {
        errors.height_min = "Height must be between 0 and 100";
    }

    if(!input.height_max) {
        errors.height_max = "Height is required";
    } else if(input.height_max < 0 || input.height_max > 100) {
        errors.height_max = "Height must be between 0 and 100";
    }

    if(!input.weight_min) {
        errors.weight_min = "Weight is required";
    } else if(input.weight_min < 0 || input.weight_min > 100) {
        errors.weight_min = "Weight must be between 0 and 100";
    }

    if(!input.weight_max) {
        errors.weight_max = "Weight is required";
    } else if(input.weight_max < 0 || input.weight_max > 100) {
        errors.weight_max = "Weight must be between 0 and 100";
    }

    if(!input.life_span) {
        errors.life_span = "Life span is required";
    } else if(input.life_span < 0 || input.life_span > 100) {
        errors.life_span = "Life span must be between 0 and 100";
    }

    if(!input.temperament) {
        errors.temperament = "Add at least one temperament";
    }

    if (input.image !== "" && !/^(ftp|http|https):\/\/[^ "]+$/.test(input.image)) {
        errors.image = "Image must be a URL";
    }

    return errors;
}

export default function CreateDog() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const temps = useSelector((state) => state.temperaments);
    const nameDogs = useSelector((state) => state.dogs);

    const[errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: "",
        height_min: "",
        height_max: "",
        weight_min: "",
        weight_max: "",
        life_span: "",
        temperament: [],
        image: "",
    });

    useEffect(() => {
        dispatch(getTemperaments());
    },[dispatch]);

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });

        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value,
        }));
    }

    function handleSelect(e) {
        setInput({
            ...input,
            temperament: input.temperament.includes(e.target.value) ? input.temperament : [...input.temperament, e.target.value]
        });
    }

    function handleButtonTemp(e) {
        e.preventDefault();
    
        setInput({
            ...input,
            temperament : input.temperament.filter(item => item !== e.target.value)
        })
    }

    function handleSubmit(e) {
        e.preventDefault();

        if(input.temperament.length === 0) {
            alert('Please select at least one temperament')
        }

        if(nameDogs.find(dog => dog.name.toLowerCase() === input.name.toLocaleLowerCase().trim())) {
            alert('Dog with this name already exists')
            setErrors({
                ...input,
                [e.target.name]: "Dog with this name already exists"
            })
        }

        if(input.name === '') {
            alert('Please enter name')
            setErrors({
                ...input,
                [e.target.name]: "Please enter name"
            })
        }else {
            dispatch(createDog(input));
            alert('Dog created successfully')
            navigate("/home");
            setInput({
                name: "",
                height_min: "",
                height_max: "",
                weight_min: "",
                weight_max: "",
                life_span: "",
                temperament: [],
                image: "",
            });
        }
    }

    return(
        <div>
            <div>
                <Link to='/home'>
                    <button >Back</button>
                </Link>
                <h1>Create your Own Breed</h1>
            </div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Name: </label>
                    <input type="text" name="name" value={input.name} onChange={handleChange} />
                    {errors.name && <p>{errors.name}</p>}
                </div>
                <div>
                    <label>WeightMin: </label>
                    <input type="number" name="weight_min" value={input.weight_min} onChange={handleChange} />
                    {errors.weight_min && <p>{errors.weight_min}</p>}
                </div>
                <div>
                    <label>WeightMax: </label>
                    <input type="number" name="weight_max" value={input.weight_max} onChange={handleChange} />
                    {errors.weight_max && <p>{errors.weight_max}</p>}
                </div>
                <div>
                    <label>HeightMin: </label>
                    <input type="number" name="height_min" value={input.height_min} onChange={handleChange} />
                    {errors.height_min && <p>{errors.height_min}</p>}
                </div>
                <div>
                    <label>HeightMax: </label>
                    <input type="number" name="height_max" value={input.height_max} onChange={handleChange} />
                    {errors.height_max && <p>{errors.height_max}</p>}
                </div>
                <div>
                    <label>LifeSpan: </label>
                    <input type="text" name="life_span" value={input.life_span} onChange={handleChange} />
                    {errors.life_span && <p>{errors.life_span}</p>}
                </div>
                <div>
                    <label>Temperaments: </label>
                    <select onChange={(e) => handleSelect(e)}>
                        <option value="" disabled>Select your option</option>
                        {
                            temps && temps.map((temp) => (
                                <option 
                                value={temp.name} 
                                key={temp.name} >{temp.name.toUpperCase()}</option>
                            ))
                        }
                    </select>
                    <div>
                        {
                            input.temperament.map((temp) => (
                                <button onClick={handleButtonTemp} value={temp} key={temp}>Remover {temp} </button>
                            ))
                        }
                        <br />
                    </div>
                    {errors.temperament && <p>{errors.temperament}</p>}
                </div>
                <div>
                    <label><strong>Image: </strong></label>
                    <input onChange={handleChange} type="url" placeholder='https://example.com (Optional)' name="image" value={input.image} / >
                    {errors.image && <p>{errors.image}</p>}
                    <br />
                </div>
                <div>
                <button type='submit'><strong>Create </strong></button>
                </div>
            </form>
        </div>
    )
}