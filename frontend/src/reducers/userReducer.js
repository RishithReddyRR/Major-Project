import { createReducer } from "@reduxjs/toolkit";
export const userReducer = createReducer(
  { user: {}, error: null },
  {
    LOGIN_REQUEST: (state, action) => {
      state.loading = true;
    },
    LOGIN_SUCCESS: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    LOGIN_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    REGISTER_USER_REQUEST: (state, action) => {
      state.loading = true;
    },
    REGISTER_USER_SUCCESS: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    REGISTER_USER_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    LOAD_USER_REQUEST: (state, action) => {
      state.loading = true;
    },
    LOAD_USER_SUCCESS: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    LOAD_USER_FAIL: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
    },
    LOGOUT_REQUEST: (state, action) => {
      state.loading = true;
    },
    LOGOUT_SUCCESS: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
    },
    LOGOUT_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    CLEAR_ERRORS: (state, action) => {
      state.error = null;
    },
  }
);

export const usersReducer = createReducer(
  { users: [] },
  {
    PUBLICATIONS_HOME_REQUEST: (state, action) => {
      state.loading = true;
    },
    USERS_SUCCESS: (state, action) => {
      state.loading = false;
      state.users = action.payload.users;
    },
    USERS_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    CLEAR_ERRORS: (state, action) => {
      state.error = null;
    },
  }
);

export const userGReducer = createReducer(
  { user: [],success:false },
  {
    LOAD_USER_G_REQUEST: (state, action) => {
      state.loading = true;
    },
    LOAD_USER_G_SUCCESS: (state, action) => {
      state.loading = false;
      state.success = true;
      state.user = action.payload[0];
    },
    LOAD_USER_G_FAIL: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
    },
    CLEAR_ERRORS: (state, action) => {
      state.error = null;
    },
  }
);
