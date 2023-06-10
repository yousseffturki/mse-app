const express=require('express')
const {getuserValidator,
      updateuserValidator,
      deleteuserValidator,
      createuserValidator,
      changeuserpasswordvalidate,
      forgetuserpasswordvalidate
       }=require('../utils/validators/userValidator');


const {getusers,
       createuser,
        getuser,
        updateuser,
        deleteuser,
        changeuserpassword,
        passwordrecovery,
        resizeImage,
        uploadUserImage,
        getusersByProject,
        getTechniciens,
        dashboardUserStatistics
    }=require('../services/userService');


const router=express.Router();

router.put('/changepassword/:id',changeuserpasswordvalidate,changeuserpassword);
router.route('/').get(getusers)
                 .post(uploadUserImage,resizeImage,createuserValidator,createuser)
                 .put(forgetuserpasswordvalidate,passwordrecovery);
router.route('/project/:id').get(getusersByProject)
router.route('/techniciens/:id').get(getTechniciens)

router.route('/statistics').get(dashboardUserStatistics)



router.route('/:id').get(getuser)
                    .put(updateuserValidator,updateuser)
                    .delete(deleteuserValidator,deleteuser);

module.exports = router;