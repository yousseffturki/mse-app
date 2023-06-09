const express=require('express')
const {createprojetValidator,deleteprojetValidator,getprojetValidator,updateprojetValidator
       }=require('../utils/validators/projetValidator');


const {createprojet,deleteprojet,getprojet,getprojets,updateprojet
        ,createFilterObj,affectTechniciensToProject
    }=require('../services/projetService');


//mergeParams : allow us to access parameter on other routers
const router=express.Router({mergeParams: true});

// router.use('/:id_cour/chapitres',chapitre);

router.route('/').get(createFilterObj,getprojets)
                 .post(createprojetValidator,createprojet);
router.route('/affect').patch(affectTechniciensToProject);
router.route('/:id').get(getprojetValidator,getprojet)
                    .put(updateprojetValidator,updateprojet)
                    .delete(deleteprojetValidator,deleteprojet);
module.exports = router;