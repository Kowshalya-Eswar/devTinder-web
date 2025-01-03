
import { createSlice } from "@reduxjs/toolkit"

const RequestSlice = createSlice ({
    name: 'requests',
    initialState: null,
    reducers: {
        addRequests:(state,action) => action.payload,
        removeRequest:(state, action) =>{
            const filteredReq = state.filter((req) => req._id !== action.payload)
            return filteredReq;
        }
        }
    })
export const {addRequests, removeRequest} = RequestSlice.actions
export default RequestSlice.reducer;
