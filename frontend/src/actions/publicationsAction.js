//get publication details
import { utils, writeFile } from "xlsx";

import axios from "axios";

export const getUserPublications = (name, currentPage) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    dispatch({ type: "PUBLICATION_REQUEST" });
    const { data } = await axios.post(
      `/publication/user-publications?page=${currentPage}`,
      { name },
      config
    );
    dispatch({ type: "PUBLICATION_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "PUBLICATION_FAIL",
      payload: error.response.data.message,
    });
  }
};
//get Admin publications
export const getAdminPublications = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    dispatch({ type: "PUBLICATION_ADMIN_REQUEST" });
    const { data } = await axios.get(`/publication/admin/publications`, config);
    dispatch({ type: "PUBLICATION_ADMIN_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "PUBLICATION_ADMIN_FAIL",
      payload: error.response.data.message,
    });
  }
};
//get Admin publications
export const getPublicationsCountHome = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    dispatch({ type: "PUBLICATION_ADMIN_REQUEST" });
    const { data } = await axios.get(
      `/publication/publicationsCount-for-home`,
      config
    );
    dispatch({ type: "PUBLICATION_ADMIN_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "PUBLICATION_ADMIN_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const getPublications =
  (
    keyword,
    currentPage,
    category,
    department,
    value,
    setValue,
    ppp,
    fYear,
    tYear,
    fMonth,
    eMonth,
    currentYear
  ) =>
  async (dispatch) => {
    keyword = keyword == undefined ? "" : keyword;
    tYear = tYear == "" ? `${currentYear}-12-31` : tYear;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      dispatch({ type: "PUBLICATION_REQUEST" });
      const { data } = await axios.post(
        `/publication/publications?page=${currentPage}&typeOfPublication=${
          category == "All" ? "" : category
        }&citations[gte]=${value[0]}&citations[lte]=${
          value[1]
        }&ppp=${ppp}&fYear=${fYear}&tYear=${tYear}&fMonth=${fMonth.toUpperCase()}&eMonth=${eMonth.toUpperCase()}&department=${department}`,
        {
          keyword,
        }
      );
      dispatch({ type: "PUBLICATION_SUCCESS", payload: data });
    } catch (error) {
      dispatch({
        type: "PUBLICATION_FAIL",
        payload: error.response,
      });
    }
  };
//delete all publications
export const deleteAllPublications = () => async (dispatch) => {
  try {
    dispatch({ type: "PUBLICATION_REQUEST" });
    const { data } = await axios.delete(`/publication/admin/delete-all`);
    dispatch({ type: "PUBLICATION_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "PUBLICATION_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const getPublicationsHome = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    dispatch({ type: "PUBLICATIONS_HOME_REQUEST" });
    const { data } = await axios.get(
      `/publication/publications-for-home`,
      config
    );
    dispatch({ type: "PUBLICATIONS_HOME_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "PUBLICATIONS_HOME_FAIL",
      payload: error.response.data.message,
    });
  }
};
export const getPublicationDetails = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    dispatch({ type: "PUBLICATION_DETAILS_REQUEST" });
    const { data } = await axios.get(`/publication/${id}`, config);
    dispatch({
      type: "PUBLICATION_DETAILS_SUCCESS",
      payload: data.publicationDetails,
    });
  } catch (error) {
    dispatch({
      type: "PUBLICATION_DETAILS_FAIL",
      payload: error.response.data.message,
    });
  }
};
export const uploadPublications = (file) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const formData = new FormData();
    formData.append("file", file);

    dispatch({ type: "PUBLICATION_UPLOAD_REQUEST" });
    const { data } = await axios.post(`/upload/publications`, formData, config);
    dispatch({
      type: "PUBLICATION_UPLOAD_SUCCESS",
      payload: data.publicationDetails,
    });
  } catch (error) {
    dispatch({
      type: "PUBLICATION_UPLOAD_FAIL",
      payload: error.response.data.message,
    });
  }
};

//delete publication

export const deletePublications = (id) => async (dispatch) => {
  try {
    dispatch({ type: "PUBLICATION_DELETE_REQUEST" });

    const { data } = await axios.delete(`/publication/admin/delete/${id}`);
    dispatch({ type: "PUBLICATION_DELETE_SUCCESS" });
  } catch (error) {
    dispatch({
      type: "PUBLICATION_DELETE_FAIL",
      payload: error.response.data.message,
    });
  }
};
//update publication

export const updatePublications = (id, ob) => async (dispatch) => {
  try {
    dispatch({ type: "PUBLICATION_DETAILS_REQUEST" });

    const { data } = await axios.put(`/publication/admin/update/${id}`, ob);
    dispatch({
      type: "PUBLICATION_DETAILS_SUCCESS",
      payload: data.publicationDetails,
    });
  } catch (error) {
    dispatch({
      type: "PUBLICATION_DETAILS_FAIL",
      payload: error.response.data.message,
      // payload: error,
    });
  }
};
//analytics of publications

export const analyticsP = (span, departments) => async (dispatch) => {
  try {
    dispatch({ type: "ANALYTICS_REQUEST" });

    const { data } = await axios.post(
      `/publication/publications_analytics?span=${span}`,
      { departments }
    );

    dispatch({
      type: "ANALYTICS_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "ANALYTICS_FAIL",
      payload: error.response.data.message,
    });
  }
};
