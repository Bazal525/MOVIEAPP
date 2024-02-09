import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authUser } from "../users";

const Login = () => {
    const [userLogin, setUserLogin] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleSubmit = (a) => {
        a.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors || {});
        if (validationErrors) return;

        authUser(userLogin, userPassword)
            .then(responseData => {
                localStorage.setItem('token', responseData.token);
                handleChangeRoute();
            })
            .catch(error => {
                const errorMessages = {};
                errorMessages.auth = error.response.data;
                setErrors(errorMessages || {});
                console.log(error.response.data);
            });
    };
    const handleChangeRoute = () => {
        navigate('/');
        window.location.reload();
    };
    const validate = () => {
        const validationErrors = {};
        if (userLogin.trim() === '') {
        }
        if (userPassword.trim() === '') {
        } else if (userPassword.trim().length < 6) {
            validationErrors.password = 'Password must be at least 6 characters!';
        }
        return Object.keys(validationErrors).length === 0 ? null : validationErrors;
    };

    return (
        <div style={pageStyles} className="pt-4 pb-4">
            <form
                style={formStyles}
                className="d-flex flex-column"
                onSubmit={handleSubmit}
            >
                <h2>Sign in</h2>
                <div className="form-group mt-5">
                    <label htmlFor="inputLogin">Login</label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputLogin"
                        placeholder="Enter login"
                        value={userLogin}
                        onChange={(e) => setUserLogin(e.target.value)}
                    />
                    {errors.username && (
                        <div className="alert alert-danger" style={{ marginTop: 4 }}>{errors.username}</div>
                    )}
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="inputPassword">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="inputPassword"
                        placeholder="Password"
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                    />
                    {errors.password && (
                        <div className="alert alert-danger" style={{ marginTop: 4 }}>{errors.password}</div>
                    )}
                </div>
                <button type="submit" className="btn btn-warning mt-lg-5" style={{ backgroundColor: "#ffc100" }}>Sign in</button>
                {errors.auth && (
                    <div className="alert alert-danger mt-3">{errors.auth}</div>
                )}
                <div className="form-group d-flex flex-column mt-5">
                    <label htmlFor="createNewAccountButton">Are you new? Create account now!</label>
                    <Link to="/signup" className="btn btn-primary" id="createNewAccountButton">Create new account</Link>
                </div>
            </form>
        </div>
    );
};

const pageStyles = {
    paddingLeft: "35%",
    paddingRight: "35%",
    backgroundColor: "#8B0000",
    color: "#ffc100",
    backgroundImage: `url("https://wallpaperset.com/w/full/7/5/b/203988.jpg")`
};

const formStyles = {
    padding: "2rem",
    backgroundColor: "rgba(0,0,0,0.45)",
    borderRadius: "25px",
    overflow: "hidden",
};

export default Login;
