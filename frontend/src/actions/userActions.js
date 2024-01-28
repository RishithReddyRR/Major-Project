import axios from "axios";

//LOGIN
export const login = (email, password) => async (dispatch) => {
    try {
      dispatch({ type: "LOGIN_REQUEST" });
  
      const config = { headers: { "Content-Type": "application/json" } };
  
      const {data} = await axios.post(
        `/user/login`,
        { email, password },
        config
      );

      data.success?dispatch({ type: "LOGIN_SUCCESS", payload: data.user }):dispatch({ type: "LOGIN_FAIL", payload:data.message });
    } catch (error) {
      dispatch({ type: "LOGIN_FAIL", payload: error.response.data.message });
    }
  }

  // Register
export const register = (userData) => async (dispatch) => {
    try {
      dispatch({ type: "REGISTER_USER_REQUEST" });
  
      const config = { headers: { "Content-Type": "multipart/form-data" } };
  
      const { data } = await axios.post(`/user/register`, userData, config);
  
      data.success?dispatch({ type: "REGISTER_USER_SUCCESS", payload: data.user }): dispatch({
        type: "REGISTER_USER_FAIL",
        payload:data.message
      });
    } catch (error) {
      dispatch({
        type: "REGISTER_USER_FAIL",
        payload: error.response.data.message,
      });
    }
  };

  //load user

  export const loadUser=()=>async(dispatch)=>{
    try {
      dispatch({type:"LOAD_USER_REQUEST"});
      const {data}=await axios.get("/user/me")
      data.success?dispatch({type:"LOAD_USER_SUCCESS",payload:data.user}):dispatch({type:"LOAD_USER_FAIL",payload:data.message})
    } catch (error) {
      dispatch({
        type: "LOAD_USER_FAIL",
        payload: error.response.data.message,
      });
    }
  }

  //logout user
export const logout = () => async (dispatch) => {
  try {
    dispatch({type:"LOGOUT_REQUEST"})
    await axios.get('/user/logout',{credentials: 'same-origin' })
    dispatch({ type: "LOGOUT_SUCCESS" });
  } catch (error) {
    dispatch({ type: "LOGOUT_FAIL", payload: error.response.data.message });
  }
}