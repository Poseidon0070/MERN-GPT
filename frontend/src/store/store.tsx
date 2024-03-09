import { createSlice, configureStore } from '@reduxjs/toolkit'

type UserState = {
    isLoggedIn: boolean;
    user: any;
}

const initialState: UserState = {
    isLoggedIn: false,
    user: null,
};

let userAuth = createSlice({
    name: 'auth',
    initialState,
    reducers: {

    }
})

let store = configureStore({
    reducer: userAuth.reducer
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const userActions = userAuth.actions
