import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Profile from './Profile';
import { NavLink } from 'react-router-dom';

const ProfileSettings = () => {
    const actuallyUser = useSelector(state => state.actuallyUserReducer)

    const url = window.location.href.split("/")
    const userName = url[url.length - 1]

    const [borderColorOfInputName, setBorderColorOfInputName] = useState("#cfd9de")
    const [borderWeightOfInputName, setBorderWeightOfInputName] = useState("1px")
    const [nameInputValue, setNameInputValue] = useState(actuallyUser.pseudo)
    const [pounce, setPounce] = useState(false)
    const [errorIsTrue, setErrorIsTrue] = useState(false)
    const [nameInputSpanClass, setNameInputSpanClass] = useState("nameInputPlaceHolderClassic")
    const [istypingInInputName, setIsTypingInInputName] = useState(false)

    const [bioInputValue, setBioInputValue] = useState(actuallyUser.bio);
    const [borderColorOfBioInput, setBorderColorOfBioInput] = useState("#cfd9de")
    const [borderWeightOfBioInput, setBorderWeightOfBioInput] = useState("1px")
    const [bioInputSpanClass, setBioInputSpanClass] = useState("bioInputPlaceHolderClassic")
    const [isTypingInBioInput, setIsTypingInBioInput] = useState(false)

    const [temoPrflPict, setTempPrflPict] = useState("")
    const [temoCovPict, setTemoCovPict] = useState("")

    const [imageConfigPonce, setImageConfigPonce] = useState(true)

    const [isDisabledButton, setIsDisabledButton] = useState(true)

    const [anotherPounce, setAnotherPounce] = useState(false)

    const [prflImage, setPrflImage] = useState(null)
    const [covImage, setCovImage] = useState(null)



    if (actuallyUser.pseudo && anotherPounce === false) {
        setBioInputValue(actuallyUser.bio)
        setNameInputValue(actuallyUser.name)
        //("ca se change et voici les nouveauté: " + actuallyUser.pseudo + "  et   aussi     " + actuallyUser.bio)
        setPounce(true)
        setAnotherPounce(true)
    }

    const [imageConfigurations, setImageConfigurations] = useState(true)
    useEffect(() => {
        document.querySelector("body").style.overflow = "hidden"
        if (imageConfigurations && actuallyUser.profilePicture !== undefined) {
            setTempPrflPict(actuallyUser.profilePicture)
            setTemoCovPict(actuallyUser.coverPicture)
            setImageConfigurations(false)
        }
        //("voici les images: ")
        //(prflImage)
        //(covImage)

        if (imageConfigPonce) {

            if (prflImage) {
                const formData = new FormData()
                formData.append("image", prflImage, "profileImage")
                axios.post("https://tweeter-clone-back-22.onrender.com/auth/returnanypict", formData).then(res => {
                    if (res.data) {
                        //("OUIII ON A L'URL QUI EST : " + res.data)
                        setTempPrflPict(res.data.url + " ")
                    }
                }).catch(err => {
                    console.error("error attention attentat : " + err)
                })
            }
            if (covImage) {
                const formData = new FormData()
                formData.append("image", covImage, "coverImage")
                axios.post("https://tweeter-clone-back-22.onrender.com/auth/returnanypict", formData).then(res => {
                    if (res.data) {
                        //("OUIII ON A L'URL QUI EST : " + res.data)
                        setTemoCovPict(res.data.url + " ")
                    }
                }).catch(err => {
                    console.error("error attention attentat : " + err)
                })
            }
            setImageConfigPonce(false)
        }

        if (pounce) {
            //("tout bie nse pas:  " + nameInputValue)
            if (nameInputValue === "") {
                setBorderColorOfInputName("#e0245e")
                setIsDisabledButton(true)
                setErrorIsTrue(true)
            } else {
                setIsDisabledButton(false)
                if (!istypingInInputName) {
                    setBorderColorOfInputName("#cfd9de")
                    setErrorIsTrue(false)
                    setNameInputSpanClass("nameInputPlaceHolderSelectedGray")
                } else {
                    setBorderColorOfInputName("#1da1f2")
                    setErrorIsTrue(false)
                }
            }

            if (bioInputValue !== "") {
                if (!isTypingInBioInput) {
                    setBorderColorOfBioInput("#cfd9de")
                    setBorderWeightOfBioInput("1px")
                    setBioInputSpanClass("bioInputPlaceHolderSelectedGray")
                } else {
                    setBorderColorOfBioInput("#1da1f2")
                    setBorderWeightOfBioInput("2px")
                }
            } else {
                setBioInputSpanClass("bioInputPlaceHolderClassic")
            }

            setPounce(false)
        }
    }, [borderColorOfInputName, borderWeightOfInputName, pounce, prflImage, covImage])

    const onSubmitInSave = async () => {
        //cover picture
        const firstFormData = new FormData()
        firstFormData.append("userId", actuallyUser._id)
        firstFormData.append("image", covImage)

        setIsDisabledButton(true)
        await axios.post("https://tweeter-clone-back-22.onrender.com/auth/editCoverPicture", firstFormData).then(res => {
            if (res.data) {
                //("photo de coverture modifié")
            } else {
                console.error("data introuvable erreur lors de la modificatino de la photo de profile")
            }
        }).catch(err => {
            console.error("error server (it's me): " + err)
        })
        //profile picture
        const secondFormData = new FormData();
        secondFormData.append("userId", actuallyUser._id);
        secondFormData.append("image", prflImage);

        await axios.post("https://tweeter-clone-back-22.onrender.com/auth/editPicture", secondFormData).then(res => {
            if (res.data) {
                //("photo de profile bien modifié")
            } else {
                console.error("data introuvable erreur lors de la modification de la photo de profile")
            }
        }).catch(err => {
            console.error("error server (it's me): " + err)
        })
        //user info

        const newName = document.getElementById("nameInput25szef5sSdfezf1ezf156zef1891rt981br89sdqd196azdzef1A").value
        const newBio = document.getElementById("bioTextArea2156zef156f1z56d1e56d1Ses5f1ze6fXWfezfz56AZ").value;

        const simpleData = {
            name: newName,
            bio: newBio,
            userId: actuallyUser._id
        }

        if (simpleData.name !== "") {
            await axios.post("https://tweeter-clone-back-22.onrender.com/auth/editUsertxt", simpleData).then(res => {
                if (res.data) {
                    //("data de l'utilisateur bien modifié")
                } else {
                    console.error("data introuvable erreur lors de la modification des data textile de l'utilisateur")
                }
            }).catch(err => {
                console.error("error server (it's me): " + err)
            })
        } else {
            console.error("you can't modify your profile if name input is blank")
        }

        setIsDisabledButton(false)

        //changer l'url sans recharger la page
        //window.history.pushState({page: "another"}, "another page", `/user/${nameInputValue}`);

        //technique a l'ancienne
        window.location.href = `/user/${actuallyUser.pseudo}`
    }
    let realUserName = actuallyUser.pseudo.split(" ").join("%20")
    //("voici la comparaison")
    //(userName + "  " + realUserName)
    return (
        <>
            {userName === realUserName ? <div className="SettingsProfile">
                <div className="classicProfile">
                    <Profile />
                </div>
                <div onClick={e => {
                    if (e.target.id !== "nameInputDS26s") {
                        setBorderWeightOfInputName("1px");
                        if (nameInputValue === "") {
                            setBorderColorOfInputName("#e0245e");
                            setNameInputSpanClass("nameInputPlaceHolderClassic")
                        } else {
                            setNameInputSpanClass("nameInputPlaceHolderSelectedGray"); setBorderColorOfInputName("#cfd9de")
                        }
                        setIsTypingInInputName(false)
                    } else {
                        setBorderWeightOfInputName("2px");
                        if (nameInputValue === "") {
                            setBorderColorOfInputName("#e0245e");
                            setNameInputSpanClass("nameInputPlaceHolderSelectedRed")
                        } else {
                            setNameInputSpanClass("nameInputPlaceHolderSelectedBleu");
                            setBorderColorOfInputName("#1da1f2")
                        }
                    }

                    if (e.target.id !== "bioInput2135555dsq") {
                        setBorderColorOfBioInput("#cfd9de")
                        setBorderWeightOfBioInput("1px")
                        if (bioInputValue === "") {
                            setBioInputSpanClass("bioInputPlaceHolderClassic")
                        } else {
                            setBioInputSpanClass("bioInputPlaceHolderSelectedGray")
                        }
                    }

                }} className="settingsPopupParent">
                    <div className="blackBackground"></div>
                    <div className="settingsPopup">
                        <div className="headPartOfPopup">
                            <div className="leftPartOfHeadPart">
                                <NavLink onClick={() => document.querySelector("body").style.overflow = "auto"} to={"/user/" + actuallyUser.pseudo} ><svg className="btn" width="22" height="22" fill="#1da1f2" viewBox="0 0 24 24" aria-hidden="true"><g><path d="M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z"></path></g></svg></NavLink>
                                <div className="EditProfileText">
                                    <h2>Edit profile</h2>
                                </div>
                            </div>
                            <div className="rightPartOfHeadPart">
                                <button onClick={onSubmitInSave} disabled={isDisabledButton} className={`btn saveBtn saveButtonToModifyUser ${isDisabledButton ? "disabled" : ""}`}>Save</button>
                            </div>
                            <div className="transistor"></div>
                        </div>
                        <div className="containerOfPopup">
                            <div className="pictureConfig">
                                <div style={{ overflow: "hidden" }} className="covPicture">
                                    {temoCovPict && <img style={{ width: "100%", height: "300%" }} alt="coverPicture" src={temoCovPict} />}
                                    <input onChange={e => { setCovImage(e.target.files[0]); setImageConfigPonce(true) }} type="file" accept="image/jpeg, image/png, image/jpg" />
                                    <svg width="22" height="22" fill="#ffffff" viewBox="0 0 24 24" aria-hidden="true"><g><path d="M19.708 22H4.292C3.028 22 2 20.972 2 19.708V7.375C2 6.11 3.028 5.083 4.292 5.083h2.146C7.633 3.17 9.722 2 12 2c2.277 0 4.367 1.17 5.562 3.083h2.146C20.972 5.083 22 6.11 22 7.375v12.333C22 20.972 20.972 22 19.708 22zM4.292 6.583c-.437 0-.792.355-.792.792v12.333c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V7.375c0-.437-.355-.792-.792-.792h-2.45c-.317.05-.632-.095-.782-.382-.88-1.665-2.594-2.7-4.476-2.7-1.883 0-3.598 1.035-4.476 2.702-.16.302-.502.46-.833.38H4.293z"></path><path d="M12 8.167c-2.68 0-4.86 2.18-4.86 4.86s2.18 4.86 4.86 4.86 4.86-2.18 4.86-4.86-2.18-4.86-4.86-4.86zm2 5.583h-1.25V15c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-1.25H10c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h1.25V11c0-.414.336-.75.75-.75s.75.336.75.75v1.25H14c.414 0 .75.336.75.75s-.336.75-.75.75z"></path></g></svg>
                                </div>
                                <div className="prflPicture">
                                    <div className="blackBackgroundTypeTwo"></div>
                                    <img id="profileImageModifier23332sd" alt="profile" src={temoPrflPict} />
                                    <input onChange={e => { setPrflImage(e.target.files[0]); setImageConfigPonce(true) }} type="file" accept="image/jpeg, image/png, image/jpg" />
                                    <svg width="22" height="22" fill="#ffffff" viewBox="0 0 24 24" aria-hidden="true"><g><path d="M19.708 22H4.292C3.028 22 2 20.972 2 19.708V7.375C2 6.11 3.028 5.083 4.292 5.083h2.146C7.633 3.17 9.722 2 12 2c2.277 0 4.367 1.17 5.562 3.083h2.146C20.972 5.083 22 6.11 22 7.375v12.333C22 20.972 20.972 22 19.708 22zM4.292 6.583c-.437 0-.792.355-.792.792v12.333c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V7.375c0-.437-.355-.792-.792-.792h-2.45c-.317.05-.632-.095-.782-.382-.88-1.665-2.594-2.7-4.476-2.7-1.883 0-3.598 1.035-4.476 2.702-.16.302-.502.46-.833.38H4.293z"></path><path d="M12 8.167c-2.68 0-4.86 2.18-4.86 4.86s2.18 4.86 4.86 4.86 4.86-2.18 4.86-4.86-2.18-4.86-4.86-4.86zm2 5.583h-1.25V15c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-1.25H10c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h1.25V11c0-.414.336-.75.75-.75s.75.336.75.75v1.25H14c.414 0 .75.336.75.75s-.336.75-.75.75z"></path></g></svg>
                                </div>
                            </div>
                            <div className="formConfig">
                                <form>
                                    <div style={{ border: `${borderWeightOfInputName} solid ${borderColorOfInputName}` }} className="nameInput">
                                        <div className="zc256qzercs">
                                            <span className={`nameInputPlaceholder ${nameInputSpanClass}`}>Name</span>
                                            <div className="theInput">
                                                <input id="nameInput25szef5sSdfezf1ezf156zef1891rt981br89sdqd196azdzef1A" onChange={e => {
                                                    setNameInputValue(e.target.value)
                                                    setIsTypingInInputName(true)
                                                    setPounce(true)
                                                }} onSelect={e => { setBorderWeightOfInputName("2px"); nameInputValue !== "" ? setNameInputSpanClass("nameInputPlaceHolderSelectedBleu") : setNameInputSpanClass("nameInputPlaceHolderSelectedRed") }} type="text" minLength="2" maxLength="50" value={nameInputValue} />
                                            </div>
                                        </div>
                                    </div>
                                    {errorIsTrue === true && <p style={{ color: "#e0245e", marginTop: "5px" }} id="errorP2135qsdez" className={`errorP`}>Name can’t be blank</p>}
                                    <div style={{ border: `${borderWeightOfBioInput} solid ${borderColorOfBioInput}` }} className="bioInput">
                                        <div className="er2sdq6azefksi">
                                            <span className={`bioInputPlaceHolder ${bioInputSpanClass}`}>Bio</span>
                                            <div className="theInput">
                                                <textarea id="bioTextArea2156zef156f1z56d1e56d1Ses5f1ze6fXWfezfz56AZ" onChange={e => {
                                                    setBioInputValue(e.target.value)
                                                    setIsTypingInBioInput(true)
                                                }} onSelect={e => {
                                                    setBioInputSpanClass("bioInputPlaceHolderSelectedBleu");
                                                    setBorderWeightOfBioInput("2px")
                                                    setBorderColorOfBioInput("#1da1f2")
                                                }} minLength="5" maxLength="160" style={{ resize: "none" }} value={bioInputValue}></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>

                </div>
            </div> : <h1>404 Not found !</h1>}

        </>
    )
}

export default ProfileSettings;