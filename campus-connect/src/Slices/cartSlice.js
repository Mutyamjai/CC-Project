import { createSlice } from "@reduxjs/toolkit";

const initial_state = {
    cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState: initial_state,
    reducers:{
        add_item(state, value){
            const new_item = value.payload;
            const existing_item = state.cart.find(item => item._id === new_item._id);

            if(existing_item)
                existing_item.count++;
            else
                state.cart.push({...new_item, count : 1});

            localStorage.setItem("cart", JSON.stringify(state.cart));
        },
        remove_item(state, value){
            const new_item = value.payload;
            const existing_item = state.cart.find(item => item._id === new_item._id);

            if(existing_item.count > 1)
                existing_item.count--;
            else
                state.cart = state.cart.filter(item => item._id !== new_item._id);

            localStorage.setItem("cart", JSON.stringify(state.cart));
        }
    }
});

export const {add_item, remove_item} = cartSlice.actions;
export default cartSlice.reducer;