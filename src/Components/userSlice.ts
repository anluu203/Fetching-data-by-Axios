import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


interface User{
    id: number;
    email: string;
    avatar: string;
    name:string
}

interface UserState {
    users: User[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

 const initialState: UserState = {
    users: [],
    status: 'idle' 

 }
export const fetchUsers = createAsyncThunk<User[]>(
    'users/fetchUsers',
    async () => {
            const response = await axios.get('https://api.escuelajs.co/api/v1/users');
            console.log(response.data)
            return(response.data);
            
    }
)


export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        deleteUser(state, action){
            state.users = state.users.filter(user => user.id !== action.payload);
        }
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchUsers.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.users = action.payload;
        }) 
        .addCase(fetchUsers.rejected, (state) => {
            state.status = 'failed';
        })  
    }
})

export const {deleteUser} = userSlice.actions
