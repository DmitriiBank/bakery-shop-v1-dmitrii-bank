import './App.css'
import {Navigate, Route, Routes} from "react-router-dom";
import {
    Paths,
    type ProductType,
    Roles,
    type RouteType, type ShopCartProdType
} from "./utils/shop-types.ts";
import Home from "./components/Home.tsx";
import Customers from "./components/Customers.tsx";
import Orders from "./components/Orders.tsx";
import ShoppingCart from "./components/ShoppingCart.tsx";
import ErrorPage from "./servicePages/ErrorPage.tsx";
// import Navigator from "./components/navigation/Navigator.tsx";
import {Bread} from "./components/Bread/Bread.tsx";
import Dairy from "./components/Dairy.tsx";
import {navItems, productItems} from "./configurations/nav-config.ts";
import NavigatorDeskTop from "./components/navigation/NavigatorDeskTop.tsx";
import Login from "./servicePages/Login.tsx";
import Logout from "./servicePages/Logout.tsx";
import {useAppDispatch, useAppSelector} from "./redux/hooks.ts";
import Registration from "./servicePages/Registration.tsx";
import {useEffect} from "react";
import {
    getProducts,
} from "./firebase/firebaseDBService.ts";
import {prodsUpd} from "./redux/slices/productSlice.ts";
import {resetCart, setCart} from "./redux/slices/cartSlice.ts";
import {getCartProducts} from "./firebase/firebaseCartService.ts";


function App() {
    const {authUser} = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch()

    useEffect(() => {
        const subscription = getProducts().subscribe({
            next: (prods: ProductType[]) => {
                dispatch(prodsUpd(prods))
            },
        })
        return () => {
            subscription.unsubscribe()
        }
    }, []);

    useEffect(() => {
        if (!authUser || authUser.includes('admin')) dispatch(resetCart())
        else {
            const subscription = getCartProducts(`${authUser}_collection`);
            subscription.subscribe({
                next: (cartProducts: ShopCartProdType[]) => dispatch(setCart(cartProducts))
            })
        }
    }, [authUser]);

    const predicate = (item: RouteType) => {
        if (item.role === Roles.ALL) return true;
        if (item.role === Roles.NO_AUTH) return !authUser;
        if (item.role === Roles.ADMIN) return authUser?.includes('admin');
        if (item.role === Roles.USER) return authUser && !authUser.includes('admin');
        if (item.role === Roles.AUTH) return !!authUser;
        return false;
    };

    const getRoutes = () => {
        return navItems.filter(item => predicate(item))
    }

    return (
        <Routes>
            {/*<Route path={Paths.HOME} element={<Navigator items={navItems}/>}>*/}
            {/*<Route path={Paths.HOME} element={<NavigatorDeskTop items={navItems}/>}>*/}
            <Route
                path={Paths.HOME}
                element={<NavigatorDeskTop items={getRoutes()} />}
            >
                <Route
                    index
                    element={<Home />}
                />
                <Route
                    path={Paths.CUSTOMERS}
                    element={<Customers />}
                />
                <Route
                    path={Paths.ORDERS}
                    element={<Orders />}
                />
                <Route
                    path={Paths.CART}
                    element={<ShoppingCart />}
                />
                <Route
                    path={Paths.PRODUCTS}
                    element={<NavigatorDeskTop items={productItems} />}
                >
                    <Route
                        index
                        element={<Navigate
                            to={Paths.BREAD}
                            replace
                        />}
                    />
                    <Route
                        path={Paths.BREAD}
                        element={<Bread />}
                    />
                    <Route
                        path={Paths.DAIRY}
                        element={<Dairy />}
                    />
                    <Route
                        path={Paths.BACK}
                        element={<Navigate to={Paths.HOME} />}
                    />
                </Route>
                <Route
                    path={Paths.LOGIN}
                    element={<Login />}
                />
                <Route
                    path={Paths.LOGOUT}
                    element={<Logout />}
                />
                <Route
                    path={Paths.REGISTER}
                    element={<Registration />}
                />
            </Route>
            <Route
                path={Paths.ERROR}
                element={<ErrorPage />}
            />
            <Route
                path="*"
                element={<Navigate
                    to={Paths.ERROR}
                    replace
                />}
            />
        </Routes>

    )
}

export default App
