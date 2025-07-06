import { useAppSelector } from "../../redux/hooks";
import {DataGrid, GridActionsCellItem, type GridColDef} from "@mui/x-data-grid";
import { Avatar, Box } from "@mui/material";
import {TrashIcon} from "../../templates/CustomIcons.tsx";
import {removeProduct} from "../../firebase/firebaseDBService.ts";

export const BreadProductsAdmin = () => {
    const {currProducts} = useAppSelector(state => state.products)
    const rows = currProducts;
    const columns : GridColDef<(typeof rows)[number]>[] = [
        { field: 'id', headerName: 'ID', width: 90, flex:0.3 },
        { field: 'title', headerName: 'Product Name', width: 150, flex:1 },
        { field: 'category', headerName: 'Category', width: 90, flex: 0.4 },
        { field: 'unit', headerName: 'Unit', width: 90, flex: 0.4 },
        { field: 'cost', headerName: 'Price in ILS', width: 90, flex: 0.4, editable:true },
        { field: 'img', width: 200,flex:0.5, renderCell: (params) => {
                console.log(params)
            return(
                    <Avatar src={'/images/' + params.row.image}/>
                )
            } },
        {
            field: 'actions',
            type: 'actions',
            flex: 0.3,
            getActions: ({id}) => [
                <GridActionsCellItem
                    label={'remove'}
                    icon={<TrashIcon />}
                    onClick={() => removeProduct(id as string)}
                />
            ]
        }
    ]

    return (
        <Box>
            <DataGrid columns={columns} rows={rows}/>
        </Box>
    );
};
