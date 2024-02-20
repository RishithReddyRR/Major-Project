import { createReducer } from "@reduxjs/toolkit";

export const imageReducer =createReducer({
    images:[]
},{
    IMAGE_REQUEST: (state, action) => {
        state.loadingI = true;
      },
    IMAGE_SUCCESS: (state, action) => {
        state.loadingI = false;
        state.successI=true;
        state.images = action.payload.images;
      },
    IMAGE_FAIL: (state, action) => {
        state.loadingI = false;
        state.errorI = action.payload;
      },
      CLEAR_ERRORS: (state, action) => {
        state.errorI = null;
        state.successI=false;
      },
})
export const imageLoadReducer =createReducer({
    images:[]
},{
    IMAGE_LOAD_REQUEST: (state, action) => {
        state.loading = true;
      },
    IMAGE_LOAD_SUCCESS: (state, action) => {
        state.loading = false;
        state.success=true;
        state.images = action.payload.images;
      },
    IMAGE_LOAD_FAIL: (state, action) => {
        state.loading = false;
        state.error= action.payload;
      },
      CLEAR_ERRORS: (state, action) => {
        state.error = null;
        state.success=false;
      },
})