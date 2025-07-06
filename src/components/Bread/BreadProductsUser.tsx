import {useAppSelector} from "../../redux/hooks";
import {
    CardActions,
    CardContent,
    Card,
    CardMedia,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/system/Grid";
import type {
    ProductType,
} from "../../utils/shop-types";
import {useNavigate} from "react-router-dom";
import {
    addProductUnitToCart,
    removeProductUnitFromCart
} from "../../firebase/firebaseCartService.ts";
import Button from "@mui/material/Button";


export const BreadProductsUser = () => {
    const {currProducts} = useAppSelector(state => state.products);
    const navigate = useNavigate()
    const {authUser} = useAppSelector(state => state.auth)
    const {cartProducts} = useAppSelector(state => state.cart);

    return (
        <Grid
            container
            spacing={2}
        >
            {currProducts.map((item: ProductType) => {
                const cartItem = cartProducts.find(prod => prod.cartProdId === item.id);
                const count = cartItem?.count ?? 0;


                return (
                    <Grid
                        item
                        key={item.id}
                        xs={12}
                        sm={6}
                        md={3}
                    >
                        <Card sx={{maxWidth: 345}}>
                            <CardMedia
                                sx={{height: 140}}
                                image={`/images/${item.image}`}
                                title={item.title}
                            />
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                >
                                    {item.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Lizards are a widespread group...
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    size="small"
                                    onClick={async () => {
                                        if (!authUser) return navigate('/login');
                                        await addProductUnitToCart(`${authUser}_collection`, item.id!);
                                    }}
                                >+</Button>
                                <Typography>{count}</Typography>
                                <Button
                                    size="small"
                                    onClick={async () => {
                                        if (!authUser) return navigate('/login');
                                        await removeProductUnitFromCart(`${authUser}_collection`, item.id!);
                                    }}
                                >-</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                );
            })}
        </Grid>
    )
};