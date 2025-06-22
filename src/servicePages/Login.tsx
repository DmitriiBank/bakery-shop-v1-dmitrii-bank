
import SignIn from "../templates/SignIn.tsx";
import {useDispatch} from "react-redux";
import {loginAction} from "../redux/slices/authSlice.ts";

const Login = () => {
    const dispatch = useDispatch();
    const handleLogin = (data: any) => {
        dispatch(loginAction(data.email));
        // console.log(JSON.stringify(data))
    }
    return (
        <div>
            <SignIn onSubmit={handleLogin} />
        </div>
    );
};

export default Login;