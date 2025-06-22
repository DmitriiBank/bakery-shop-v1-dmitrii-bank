import Button from "@mui/material/Button";
import {useDispatch} from "react-redux";
import {logoutAction} from "../redux/slices/authSlice.ts";


const Logout = () => {
    const dispatch = useDispatch();
    return (
        <div>
            <Button
            onClick={() => {
                alert("Are you sure?");
                dispatch(logoutAction());
            }}
            >Logout</Button>
        </div>
    );
};

export default Logout;