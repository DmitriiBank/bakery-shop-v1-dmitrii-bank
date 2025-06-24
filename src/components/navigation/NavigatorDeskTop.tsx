import {AppBar, Avatar, Box, Tab, Tabs} from "@mui/material";
import type {RouteType} from "../../utils/shop-types.ts";
import {type FC, useState, useEffect} from "react";
import {Link, Outlet, useLocation} from "react-router-dom";
import {useAppSelector} from "../../redux/hooks.ts";
import Typography from "@mui/material/Typography";

type Props = {
    items: RouteType[]
    sub?: string;
}

const NavigatorDeskTop: FC<Props> = ({items}) => {
    const [value, setValue] = useState(0);
    const location = useLocation();
    const {authUser, displayName} = useAppSelector(state => state.auth);

    useEffect(() => {
        const currentPath = location.pathname;
        const activeIndex = items.findIndex((item) => {
            if (item.path === "/") {
                return currentPath === "/";
            }
            return currentPath.includes(item.path);
        });

        if (activeIndex !== -1) {
            setValue(activeIndex);
        }
    }, [location.pathname, items]);

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{mt: "50px"}}>
            <AppBar sx={{backgroundColor: "lightgray"}}>
                <Tabs
                    value={value}
                    onChange={handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                >
                    {items.map((item, index) => (
                        <Tab
                            key={item.path}
                            component={Link}
                            to={item.path}
                            label={item.title}
                            value={index}
                        />
                    ))}
                {authUser && (
                    <Box sx={{ display: "flex", alignItems: "center", ml: "auto", mr: "15px"}}>
                        <Avatar sx={{m: "5px"}}>{(displayName || authUser)?.[0]?.toUpperCase()}</Avatar>
                        <Typography variant="subtitle1" sx={{ color: "black" }}>
                            {displayName || authUser}
                        </Typography>
                    </Box>
                )}
                </Tabs>

            </AppBar>
            <Outlet/>
        </Box>
    );
};

export default NavigatorDeskTop;