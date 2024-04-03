import { configureStore, createSlice } from "@reduxjs/toolkit";


let user = createSlice({
    name:'user',
    initialState:{
        username:'',
        nickname:'',
        role:''
    },
    reducers:{
        setUser(state,action){
            const { username, nickname, role } = action.payload;
            state.username = username;
            state.nickname = nickname;
            state.role = role;
        }
    }
})
export let { setUser } = user.actions;

export default configureStore({
    reducer:{
        user : user.reducer,
    }
})