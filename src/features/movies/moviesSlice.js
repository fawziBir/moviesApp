import { createSlice } from '@reduxjs/toolkit'

export const moviesSlice = createSlice({
  name: 'movie',
  initialState: {
  	//All displayed movies used for filter and pagination
    value: [],
    //All current movies
    allValues: [],
    pageSize: 12,
    currentPage: 1,
    pagesNumber: 1,
    filterValues: [],
    categoryFilter: "All"
  },
  reducers: {
  	assignAll: (state, action) =>{
  		state.allValues = action.payload
  		state.pagesNumber = Math.ceil(state.allValues.length/state.pageSize)
  	},
  	assign: (state,action) =>{
  		state.value = action.payload
  	},
  	deleteItem: (state, action) =>{
  		state.value = state.value.filter(x => x.id !== action.payload)
  		state.allValues = state.allValues.filter(x => x.id !== action.payload)
  	},
  	setPageItems: (state, action) =>{
  		// console.log(action.payload)
  		state.pageSize = action.payload.pageSize
  		state.currentPage = action.payload.currentPage
  		if(state.categoryFilter !== "All"){
  			if (state.pageSize < state.filterValues.length){
  			state.value = state.filterValues.slice((state.currentPage-1)*state.pageSize,state.pageSize*state.currentPage)
  			}else{
  				state.value = state.filterValues
  			}
  			state.pagesNumber = Math.ceil(state.filterValues.length/state.pageSize)
  		}else{
  			if (state.pageSize < state.allValues.length){
  			state.value = state.allValues.slice((state.currentPage-1)*state.pageSize,state.pageSize*state.currentPage)
  		}else{
  			state.value = state.allValues
  		}
  		state.pagesNumber = Math.ceil(state.allValues.length/state.pageSize)
  		}
  		
  		console.log(state.value)
  	},
  	// setPagesNumber: (state,action) =>{}
  	setFilterValues: (state, action) => {
  		if (action.payload !== "All"){
  		state.filterValues = state.allValues.filter(movie => movie.category === action.payload)
  		state.categoryFilter = action.payload  			
  		}else{
  			state.filterValues = []
  			state.categoryFilter = "All"
  		}
  	}

  }})

export const { assign, assignAll, deleteItem, setPageItems, setFilterValues } = moviesSlice.actions

export default moviesSlice.reducer