import axios from "axios";
import { loginStart, loginFailed, loginSuccess, registerFailed, registerStart, registerSuccess, logOutStart } from "./authSlice"

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("http://localhost:8001/v1/auth/login", user);
        dispatch(loginSuccess(res.data));
        navigate("/");
    } catch (error) {
        dispatch(loginFailed());
    }
};

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        await axios.post("http://localhost:8001/v1/auth/register", user);
        dispatch(registerSuccess());
        navigate("/login");
    } catch (error) {
        dispatch(registerFailed());
    }
}

// export const logOut = async (dispatch, navigate) => {
//     dispatch(logOutStart())
//     try {
//         await
//     } catch (error) {

//     }
// }