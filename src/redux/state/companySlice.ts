import { createSlice } from "@reduxjs/toolkit";

export interface CompanyState {
    companys: [];
    loading: boolean;
    pageNo: number;
    totalCompanys: number,
    from: number | null,
    to: number | null
  }

  const initialState: CompanyState = {
    companys: [],
    loading: false,
    pageNo: 1,
    totalCompanys: 0,
    from: 0,
    to: 0
  };

export const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {
        setCompanys: (state, action) => {
            state.companys = action.payload
        },
        setTotalCompanys:(state, action)=>{
            state.totalCompanys=action.payload
        },
        setPageNo: (state, action) => {
            state.pageNo = parseInt(action.payload)
        },
        setloading:(state, action)=>{
            state.loading=action.payload
        },
        setFrom:(state, action)=>{
            state.from=action.payload
        },
        setTo:(state, action)=>{
            state.to=action.payload
        }
    }
})

export const {setCompanys, setTotalCompanys, setPageNo, setloading, setFrom, setTo } = companySlice.actions
export default companySlice.reducer