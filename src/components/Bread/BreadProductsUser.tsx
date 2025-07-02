import {useAppSelector} from "../../redux/hooks";
import {CardActions, CardContent, Grid, Card, CardMedia, Typography, Button} from "@mui/material";
import type {ProductType} from "../../utils/shop-types";

export const BreadProductsUser = () => {
    const {currProducts} = useAppSelector(state => state.products);
    return (
        <Grid container>
            {currProducts.map((item:ProductType) =>
                <Grid key={item.id!} size={{xs:12, sm: 6, md: 3}}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            sx={{ height: 140 }}
                            image={"/images/"+item.image}
                            title={item.title}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {item.title}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                species, ranging across all continents except Antarctica
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">+</Button>
                            <Typography>0</Typography>
                            <Button size="small">-</Button>
                        </CardActions>
                    </Card>
                </Grid>
            )}
        </Grid>

    );
};