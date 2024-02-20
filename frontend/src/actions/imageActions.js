import axios from "axios";

export const uploadImage = (ob) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    dispatch({ type: "IMAGE_REQUEST" });
    const { data } = await axios.post(`/carousel-image/upload`, ob, config);
    data.success
      ? dispatch({ type: "IMAGE_SUCCESS", payload: data })
      : dispatch({
          type: "IMAGE_FAIL",
          payload: data.message,
        });
  } catch (error) {
    dispatch({
      type: "IMAGE_FAIL",
      payload: error.response.data.message,
    });
  }
};
export const deleteImage = (public_id,_id) => async (dispatch) => {
  try {
    dispatch({ type: "IMAGE_REQUEST" });
    const { data } = await axios.post(`/carousel-image/delete`,{ public_id,_id });
    dispatch({ type: "IMAGE_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "IMAGE_FAIL",
      payload: error.response.data.message,
    });
  }
};
export const allImages = () => async (dispatch) => {
  try {
    dispatch({ type: "IMAGE_LOAD_REQUEST" });
    const { data } = await axios.get(`/carousel-image/get`);
    dispatch({ type: "IMAGE_LOAD_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "IMAGE_LOAD_FAIL",
      payload: error.response.data.message,
    });
  }
};
