import {createSlice} from "@reduxjs/toolkit";
import type {ProductType} from "../../utils/shop-types.ts";

type productsState = {
    currProducts: ProductType[],
}

const initialState: productsState = {
    currProducts: []
}

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        prodsUpd: (state, action) => {
            state.currProducts = action.payload
        }
    }
})

export const {prodsUpd} = productSlice.actions
export const prodsReducer = productSlice.reducer