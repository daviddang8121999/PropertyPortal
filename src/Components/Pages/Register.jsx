
import { useState, useEffect, useRef } from "react";
import { faCheck, faTimes, faInfoCircle, faBold, faItalic } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon, fontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../../api/axios";
import logoWhite from '../Assets/LogoW.png'

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PwD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL ='/register';


const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user])

    useEffect(() => {
        const result = PwD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])

    useEffect (() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(user);
        const v2 = PwD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        console.log(user, pwd);
        setSuccess(true);
        try {
            const response = await axios.post((REGISTER_URL, 
                JSON.stringify({ user, pwd})),
                {
                    headers: { 'Content-Type': 'application/json'},
                    withCredentials: true
                });
                console.log(response.data);
                console.log(response.accessToken);
                console.log(JSON.stringify(response))
                setSuccess(true);
                // clear input fields
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();

        }
    }
        

  return (
    <>
    {success ? (
        <section>
            <h1>Success!</h1>
            <p>
                <a href="#">Sign IN</a>
            </p>
        </section>
    ) : (
    <section className="CreSection">
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="asswertive">{errMsg}</p>
        <div className="RegisHeader">
            <img src={logoWhite} 
            style={{               
                maxWidth: '200px',
                display:'flex',
                alignSelf:'center',
                margin:'0.2px',
                
            }} />
            <h1 style={{
                fontStyle:'inter',
                fontSize:'30px',
                fontWeight:'600',
                marginTop:'-2rem',
                color:'#6C6C6C'
            }}>Register</h1>
        </div>
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">
                Username:
                <span className={validName ? "valid" : "hide"}> 
                    <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validName || !user ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                </span>
            </label>
            <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uinote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
            />
            <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                4 to 24 characters.<br />
                Must begin with a letter.<br />
                Letters, numbers, underscores, hyphens allowed
            </p>
                
            <label htmlFor="password">
                Password:
                <span className={validPwd ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validPwd || !pwd ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                </span>
            </label>
            <input
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                required
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
            />
            <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                8 to 24 characters.<br />
                Must include uppercase and lowercase letters, a number and a special character.<br />
                Allowed special characters: <span aria-label="exclamation mark">!</span>
                <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
            </p>

            <label htmlFor="confirm_pwd">
                Confirm Password:
                <span className={validMatch && matchPwd ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                </span>
            </label>
            <input
                type="password"
                id="confirm_pwd"
                onChange={(e) => setMatchPwd(e.target.value)}
                requiredaria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
            />
            <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                Must match the first password input field.
            </p>

            <button className="SignUp" disabled={!validName || !validPwd || !validMatch ? true : false}>
                <span className="SubmitButton">Sign Up</span>
            </button>
        </form>
        <div style={{
            display:'flex',
            alignSelf:'center'
        }}>
            <p>
                Already registered?&nbsp; 
                <span className="line">
                    {/* {put router link here} */}
                    <a href="#">Sign In</a>
                </span>
            </p>
        </div>
    </section>
    )}
    </>
  )
}

export default Register
