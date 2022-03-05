import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import jwt from 'jwt-decode';

const Signin = () => {
    let cooks = document.cookie.split(";")

    let id = null;
    for (let index = 0; index < cooks.length; index++) {
        try {
            let a = jwt(cooks[index])
            if (a) {
                id = a.id
                //("le cookie est valid", { color: 'green' })
            }
        } catch (err) {
            // //("this cookie are not valide")
        }
    }
    const onClickInInput = e => {
        let all = document.getElementsByClassName("contentInputs")
        for (let index = 0; index < all.length; index++) {
            all[index].classList.remove("contentInputsOnFocus")
            if (all[index].children[1].value !== "") {
                all[index].children[0].classList.replace("labelSelected", "labelSelectedNotBlue")
            } else {
                all[index].children[0].classList.remove("labelSelected")
                all[index].children[0].classList.remove("labelSelectedNotBlue")
                all[index].children[1].classList.replace("zc223dsFcc", 'zc223dsDsq')
            }
        }
        e.target.parentElement.classList.add("contentInputsOnFocus")
        e.target.parentElement.children[0].classList.add("labelSelected");
        e.target.parentElement.children[1].classList.replace("zc223dsDsq", "zc223dsFcc")
    }
    const onLeaveInInput = e => {
        if (e.target.parentElement.classList[e.target.parentElement.classList.length - 1] !== "contentInputsOnFocus") {
            let all = document.getElementsByClassName("contentInputs")
            for (let index = 0; index < all.length; index++) {
                all[index].classList.remove("contentInputsOnFocus")
                if (all[index].children[1].value !== "") {
                    all[index].children[0].classList.replace("labelSelected", "labelSelectedNotBlue")
                } else {
                    all[index].children[0].classList.remove("labelSelected")
                    all[index].children[0].classList.remove("labelSelectedNotBlue")
                    all[index].children[1].classList.replace("zc223dsFcc", 'zc223dsDsq')
                }
            }
        }
    }

    let [inputs, setInputs] = useState([])
    let [ponce, setPonce] = useState(true)
    useEffect(() => {
        if (ponce) {
            let allInputs = document.getElementsByClassName("input")

            if (allInputs[0].value !== "" && allInputs[1].value !== "") {
                let all = document.getElementsByClassName("contentInputs")
                for (let index = 0; index < all.length; index++) {
                    //all[index].children[0].classList.remove("labelSelected")
                    all[index].children[0].classList.add("labelSelectedNotBlue")
                    all[index].children[1].classList.replace("zc223dsDsq", 'zc223dsFcc')
                    //("olalala c lu")
                }
            }
            setInputs([allInputs[0].value, allInputs[1].value])
            setPonce(false)
        }
    }, [inputs, ponce])
    return (
        <>
            {id ? window.location.replace("/") : <div className="container" onClick={onLeaveInInput}>
                <div className="signin">
                    <div className="header">
                        <svg fill="#1da1f2" width="40" heigth="40" viewBox="0 0 24 24" aria-hidden="true" className="twitterIcon">
                            <g>
                                <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
                            </g>
                        </svg>
                        <h1>Se connecter à Tweetter</h1>
                    </div>
                    <div className="errorBloc none">
                        <p className="error"></p>
                    </div>
                    <div className="content">
                        <form onSubmit={e => {
                            e.preventDefault();
                            if (e.target[2].classList[1] !== "disabledBtn") {
                                const data = {
                                    pseudoOrEmail: e.target[0].value,
                                    password: e.target[1].value
                                }
                                axios.post("https://tweeter-clone-back-22.onrender.com/auth/login", data).then(res => {
                                    //(res.data)
                                    if (res.data.error) {
                                        console.error(res.data.error)
                                        let errorBloc = document.querySelector(".errorBloc")
                                        errorBloc.classList.remove("none")
                                        errorBloc.children[0].textContent = res.data.error
                                    } else {
                                        //("requête reussi !")
                                        let errorBloc = document.querySelector(".errorBloc")
                                        errorBloc.classList.add("none")
                                        let date = new Date(Date.now() + 1000*60*60*24*3); //86400000ms = 1 jour
                                        document.cookie = `user=${res.data.cookie}; path=/; expires=` + date;
                                        window.location.reload()
                                    }
                                }).catch(err => {
                                    console.error(err)
                                })
                            }
                        }}>
                            <div className="emailOrUserNameInput contentInputs">
                                <label>email ou nom d'utilisateur</label>
                                <input onChange={() => setPonce(true)} name="pseudoOrEmail" onClick={onClickInInput} className="zc223dsDsq input" type="text" />
                            </div>
                            <div className="passwordInput contentInputs">
                                <label>Mot de passe</label>
                                <input onChange={() => {
                                    setPonce(true)
                                }} name="password" onClick={onClickInInput} className="zc223dsDsq input" type="password" />
                            </div>
                            <div className="submitZone">
                                {inputs[0] === "" || inputs[1] === "" || !inputs[0] || !inputs[1] ? <input className="btn disabledBtn" type="submit" value="Se connecter" /> : null}
                                {inputs[0] !== "" && inputs[1] !== "" && inputs[0] && inputs[1] ? <input className="btn" type="submit" value="Se connecter" /> : null}
                            </div>
                        </form>
                    </div>
                    <div className="footer" onClick={onLeaveInInput}>
                        <NavLink to="/login" className="navAuth">Mot de passe oublié ?</NavLink>
                        <p>.</p>
                        <NavLink to="/signup" className="navAuth">S'inscrire sur tweeter</NavLink>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default Signin;
