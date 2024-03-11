const express=require('express');
const { uploadUsers } = require('../controllers/fileUploadController');
const { createUser,userLogin, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, temp, scrapDetails, updatePasswords } = require('../controllers/userController');
const { isAuthenticatedUser } = require('../middleware/auth');

//route for creaing user
const router=express.Router()
router.route('/login').post(userLogin);
router.route('/register').post(createUser);
router.route('/logout').get(logout);
router.route('/pass_reset').post(forgotPassword)
router.route('/pass_reset/:token').put(resetPassword)
router.route('/me').get(isAuthenticatedUser,getUserDetails)
router.route('/update_password').put(isAuthenticatedUser,updatePassword)
router.route('/update_passwords').put(updatePasswords)
router.route('/update_profile').put(isAuthenticatedUser,updateProfile)
router.route('/update').put(temp)
router.route('/scrap_user_pubs').put(isAuthenticatedUser,scrapDetails)

module.exports=router