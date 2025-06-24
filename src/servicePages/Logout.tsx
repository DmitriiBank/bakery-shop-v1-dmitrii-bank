import Button from "@mui/material/Button";
import {useDispatch} from "react-redux";
import {logoutAction} from "../redux/slices/authSlice.ts";
import {useNavigate} from "react-router-dom";



const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div>
            <Button
            onClick={() => {
                alert("Are you sure?");
                dispatch(logoutAction());
                navigate('/');
            }}
            >Logout</Button>
        </div>
    );
};

export default Logout;