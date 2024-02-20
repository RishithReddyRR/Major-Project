import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer";
import { publicationAdminReducer, publicationDeleteReducer, publicationDetailsReducer, publicationReducer, publicationUploadReducer } from "./reducers/publicationReducer";
import { imageLoadReducer, imageReducer } from "./reducers/imageReducer";
export const store=configureStore({
    reducer:{
        user:userReducer,
        userPublications:publicationReducer,
        publicationDetails:publicationDetailsReducer,
        publicationUpload:publicationUploadReducer,
        publicationsAdmin:publicationAdminReducer,
        publicationsDelete:publicationDeleteReducer,
        images:imageReducer,
        imagesLoad:imageLoadReducer
    }
})