
import SignIn from "./SignIn.tsx";

const Login = () => {
    const handleLogin = (data: any) => {
        console.log(JSON.stringify(data))
    }
    return (
        <div>
            <SignIn onSubmit={handleLogin} />
        </div>
    );
};

export default Login;