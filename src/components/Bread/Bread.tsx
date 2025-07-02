import {useAppSelector} from "../../redux/hooks.ts";
import {BreadProductsAdmin} from "./BreadProductsAdmin.tsx";
import {BreadProductsUser} from "./BreadProductsUser.tsx";


export const Bread = () => {
const {authUser} = useAppSelector(state => state.auth)
   if(authUser && authUser.includes('admin')){
       return <BreadProductsAdmin/>
   }
    return <BreadProductsUser/>
};

