import React, { useContext } from 'react'
import { useRef, useState, useEffect } from 'react'
import logoWhite from '../Assets/LogoW.png'
import AuthContext from '../../context/AuthProvider'
import axios from '../../api/axios'
import './Login.css'


const LOGIN_URL = '/auth';

const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
                const response = await axios.post(LOGIN_URL, JSON.stringify({user, pwd}),
                {
                    hearders: { 'Content-type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ user, pwd, roles, accessToken });
            setUser('');
            setPwd('');
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Userna, or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
        
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <a href='#'>Go to Home</a>
                    </p>
                </section>
            ) : (
        <section className='CreSection'>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
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
                }}>Sign In</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input 
                    type="text" 
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                />
                
                <label htmlFor="Password">Password:</label>
                <input 
                    type="password" 
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />

                <button>
                    <span className="SubmitButton">Sign In</span>
                </button>
            </form>

            <div style={{
            display:'flex',
            alignSelf:'center'
                }}>
                <p>
                    Need an account?&nbsp; 
                    <span className="line">
                        {/* {put router link here} */}
                        <a href="#">Sign Up</a>
                    </span>
                </p>
            </div>
        </section>
        )}
        </>
    )
}

export default Login