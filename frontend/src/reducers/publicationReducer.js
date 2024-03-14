import { createReducer } from "@reduxjs/toolkit";

export const publicationReducer = createReducer(
  { publications: [] },
  {
    PUBLICATION_REQUEST: (state, action) => {
      state.loading = true;
    },
    PUBLICATION_SUCCESS: (state, action) => {
      state.loading = false;
      state.publications = action.payload.publications;
      state.publicationsCount = action.payload.publicationsCount;
      state.resultPerPage = action.payload.resultPerPage;
      state.filteredPublicationsCount =
        action.payload.filteredPublicationsCount;
      state.totalPublications = action.payload.tPub;
      state.countArray = action.payload.countArray;
      state.yearCount = action.payload.yearCount;
      state.yearCitationsCount = action.payload.yearCitationsCount;
    },
    PUBLICATION_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    CLEAR_ERRORS: (state, action) => {
      state.error = null;
    },
  }
);
export const publicationAdminReducer = createReducer(
  { publications: [] },
  {
    PUBLICATION_ADMIN_REQUEST: (state, action) => {
      state.loadingD = true;
    },
    PUBLICATION_ADMIN_SUCCESS: (state, action) => {
      state.loadingD = false;
      state.publications = action.payload.publications;
      state.publicationsCount = action.payload.publicationsCount;
      state.countArray = action.payload.countArray;
      state.yearCount = action.payload.yearCount;
      state.yearCountEach = action.payload.yearCountEach;
    },
    PUBLICATION_ADMIN_FAIL: (state, action) => {
      state.loadingD = false;
      state.error = action.payload;
    },
    CLEAR_ERRORS: (state, action) => {
      state.error = null;
    },
  }
);
export const publicationDetailsReducer = createReducer(
  { publication: {} },
  {
    PUBLICATION_DETAILS_REQUEST: (state, action) => {
      state.loading = true;
    },
    PUBLICATION_DETAILS_SUCCESS: (state, action) => {
      state.loading = false;
      state.publication = action.payload;
      state.isUpdated=true
    },
    PUBLICATION_DETAILS_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    PUBLICATION_DETAILS_LOA: (state, action) => {
      state.loading = true;
      state.publication.listOfAuthors=[...state.publication.listOfAuthors,""]
      state.loading = false;
    },
    PUBLICATION_DETAILS_LOAD: (state, action) => {
      state.loading = true;
      let arr=[]
      console.log((action.payload))
      console.log(typeof(action.payload))
      for(let i=0;i<state.publication.listOfAuthors.length;i++){
        if(i!=action.payload){
           arr.push(state.publication.listOfAuthors[i])
        }
      }
      state.publication.listOfAuthors=arr
      state.loading = false;
    },
    PUBLICATION_DETAILS_KEY: (state, action) => {
      state.publication.keywords=[...state.publication.keywords,""]
    },
    CLEAR_ERRORS: (state, action) => {
      state.loading=false
      state.error = null;
      state.isUpdated=false;
    },
  }
);

export const publicationUploadReducer = createReducer(
  { error: null, loading: false, success: false },
  {
    PUBLICATION_UPLOAD_REQUEST: (state, action) => {
      state.loading = true;
    },
    PUBLICATION_UPLOAD_SUCCESS: (state, action) => {
      state.loading = false;
      state.success = true;
    },
    PUBLICATION_UPLOAD_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    CLEAR_ERRORS: (state, action) => {
      state.error = null;
      state.success = false;
    },
  }
);
export const publicationDeleteReducer = createReducer(
  { error: null, loading: false, success: false,deleted:false },
  {
    PUBLICATION_DELETE_REQUEST: (state, action) => {
      state.loading = true;
    },
    PUBLICATION_DELETE_SUCCESS: (state, action) => {
      state.loading = false;
      state.success = true;
      state.deleted=!state.deleted
    },
    PUBLICATION_DELETE_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    CLEAR_ERRORS: (state, action) => {
      state.error = null;
      state.success = false;
    },
  }
);
export const publicationUserScrap = createReducer(
  { error: null, loading: false, success: false },
  {
    PUBLICATION_SCRAP_REQUEST: (state, action) => {
      state.loading = true;
    },
    PUBLICATION_SCRAP_SUCCESS: (state, action) => {
      state.loading = false;
      state.success = true;
    },
    PUBLICATION_SCRAP_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    CLEAR_ERRORS: (state, action) => {
      state.error = null;
      state.success = false;
    },
  }
);
export const publicationsHome = createReducer(
  { publications: [] },
  {
    PUBLICATIONS_HOME_REQUEST: (state, action) => {
      state.loading = true;
    },
    PUBLICATIONS_HOME_SUCCESS: (state, action) => {
      state.loading = false;
      state.publications = action.payload.publications;
      state.publicationsCount = action.payload.publicationsCount;
      state.resultPerPage = action.payload.resultPerPage;
      state.filteredPublicationsCount =
        action.payload.filteredPublicationsCount;
      state.totalPublications = action.payload.tPub;
      state.countArray = action.payload.countArray;
      state.yearCount = action.payload.yearCount;
      state.yearCitationsCount = action.payload.yearCitationsCount;
    },
    PUBLICATIONS_HOME_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    CLEAR_ERRORS: (state, action) => {
      state.error = null;
    },
  }
);
