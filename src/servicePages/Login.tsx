
import SignIn from "../templates/SignIn.tsx";
import {useDispatch} from "react-redux";
import {loginAction} from "../redux/slices/authSlice.ts";
import {useNavigate} from "react-router-dom";
import type {LoginData} from "../utils/shop-types.ts";
import {login} from "../firebase/firebaseAuthService.ts";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const handleLogin = (data: any) => {
    //     dispatch(loginAction(data.email));
    //     navigate("/")
    //     // console.log(JSON.stringify(data))
    // }

    const loginWithFirebase = async (loginData: LoginData) => {
        try{
            const userData = await login(loginData);
            dispatch(loginAction(userData));
            navigate("/");
        }catch(err){
            console.log(err); //Todo
        }
    }


    return (
        <div>
            <SignIn submitFn={loginWithFirebase} />
        </div>
    );
};

export default Login;