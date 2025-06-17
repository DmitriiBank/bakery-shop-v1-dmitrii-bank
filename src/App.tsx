import './App.css'
import {Navigate, Route, Routes} from "react-router-dom";
import {Paths} from "./utils/shop-types.ts";
import Home from "./components/Home.tsx";
import Customers from "./components/Customers.tsx";
import Orders from "./components/Orders.tsx";
import ShoppingCart from "./components/ShoppingCart.tsx";
import ErrorPage from "./components/ErrorPage.tsx";
// import Navigator from "./components/navigation/Navigator.tsx";
import Bread from "./components/Bread.tsx";
import Dairy from "./components/Dairy.tsx";
import {navItems, productItems} from "./configurations/nav-config.ts";
import NavigatorDeskTop from "./components/navigation/NavigatorDeskTop.tsx";

function App() {


    return (
        <Routes>
            {/*<Route path={Paths.HOME} element={<Navigator items={navItems}/>}>*/}
            <Route path={Paths.HOME} element={<NavigatorDeskTop items={navItems}/>}>
                <Route index element={<Home />} />
                <Route path={Paths.CUSTOMERS} element={<Customers />} />
                <Route path={Paths.ORDERS} element={<Orders />} />
                <Route path={Paths.CART} element={<ShoppingCart />} />
                <Route path={Paths.PRODUCTS} element={<NavigatorDeskTop items={productItems} />}>
                    <Route path={Paths.BREAD} element={<Bread />} />
                    <Route path={Paths.DAIRY} element={<Dairy />} />
                </Route>
            </Route>
            <Route path={Paths.ERROR} element={<ErrorPage />} />
            <Route path="*" element={<Navigate to={Paths.ERROR} replace />} />
        </Routes>

    )
}

export default App
