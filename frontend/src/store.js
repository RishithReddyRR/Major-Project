import { configureStore } from "@reduxjs/toolkit";
import { userGReducer, userReducer, usersReducer } from "./reducers/userReducer";
import { publicationAdminReducer, publicationDeleteReducer, publicationDetailsReducer, publicationReducer, publicationsHome, publicationUploadReducer, publicationUserScrap } from "./reducers/publicationReducer";
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
        imagesLoad:imageLoadReducer,
        scrapUserPubs:publicationUserScrap,
        homePublications:publicationsHome,
        users:usersReducer,
        userG:userGReducer
    }
})