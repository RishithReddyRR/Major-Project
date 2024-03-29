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
  
      const config = { headers: { "Content-Type": "application/json" } };
  
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
  //load user

  export const loadUserG=(name)=>async(dispatch)=>{
    try {
      dispatch({type:"LOAD_USER_G_REQUEST"});
      const {data}=await axios.get(`/user/user_d?name=${name}`)
      data.success?dispatch({type:"LOAD_USER_G_SUCCESS",payload:data.user}):dispatch({type:"LOAD_USER_G_FAIL",payload:data.message})
    } catch (error) {
      dispatch({
        type: "LOAD_USER_G_FAIL",
        payload: error.response.data.message,
      });
    }
  }

  //logout user
export const logout = () => async (dispatch) => {
  try {
    dispatch({type:"LOGOUT_REQUEST"})
    await axios.get('/user/logout',{credentials: 'same-origin' })
    localStorage.clear()
    dispatch({ type: "LOGOUT_SUCCESS" });
  } catch (error) {
    dispatch({ type: "LOGOUT_FAIL", payload: error.response.data.message });
  }
}
  //users by Department
export const usersByDepartment = (department) => async (dispatch) => {
  department=department=="CSE(AI ML,IOT)"?"CSEAIML":department
  department=department=="CSE(CYS,DS)"?"CSECYS":department
  try {
    dispatch({type:"USERS_REQUEST"})
    const {data}=await axios.get(`/user/users_by_department?department=${department}`)
    dispatch({ type: "USERS_SUCCESS",payload:data });
  } catch (error) {
    dispatch({ type: "USERS_FAIL", payload: error.response.data.message });
  }
}
//scrap user publications

export const scrapUserPublications = () => async (dispatch) => {
  try {
    dispatch({ type: "PUBLICATION_SCRAP_REQUEST" });

    const { data } = await axios.put(`/user/scrap_user_pubs`);
    dispatch({
      type: "PUBLICATION_SCRAP_SUCCESS",
    });
  } catch (error) {
    dispatch({
      type: "PUBLICATION_SCRAP_FAIL",
      payload: error.response.data.message,
      // payload: error,
    });
  }
};
