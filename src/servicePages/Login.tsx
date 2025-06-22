
import SignIn from "../templates/SignIn.tsx";
import {useDispatch} from "react-redux";
import {loginAction} from "../redux/slices/authSlice.ts";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = (data: any) => {
        dispatch(loginAction(data.email));
        navigate("/")
        // console.log(JSON.stringify(data))
    }
    return (
        <div>
            <SignIn onSubmit={handleLogin} />
        </div>
    );
};

export default Login;