const Projetmodel=require('../models/projetModel')
const usermodel = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const ApiError=require('../utils/apiError')


// @desc    Get all projet
// @route   GET api/projets/
// @access  Private
exports.getprojets=asyncHandler(async(req,res) => {
    const projet = await Projetmodel.find({}) ;

    res.status(200).json({results:projet.length,data:projet})
  });

  exports.affectTechniciensToProject=asyncHandler(async(req,res) => {
    const listTechniciens = req.body.techniciens;
    listTechniciens.forEach(technicien => {
      if(req.body.projectId != null){
      affecterUnTechnicienAUnProjet(technicien,req.body.projectId);}
      else{
        affecterUnTechnicienAUnProjet(technicien,null);
      }
    });
    res.status(200).json("Reussi");
  });

  const affecterUnTechnicienAUnProjet = (async(technicien,projectId) => {
    const filter = { "email": technicien.email };
    const update = { "projetid": projectId };
    const user = await usermodel.findOneAndUpdate(filter,update);
    user.projetid = projectId;
    user.save();
  });


// @desc    Get specific projet by id
// @route   GET api/projet/:id
// @access  Private
exports.getprojet = asyncHandler(async(req,res,next)=>{
  const {id}=req.params; 
  const projets = await Projetmodel.findById(id);
  if(!projets)
  {
    return   next(new ApiError(`projet not found for this id ${id}`,404)); 
}
  res.status(200).json({data: projets});
})

exports.createFilterObj=(req,res,next) => {
  let filterObject={};
  if(req.params.id_catalogue) filterObject ={id_catalogue:req.params.id_catalogue};
  req.filterObj =filterObject;
next();
}


// @desc    Create a new projet
// @route   POST api/projets/
// @access  Private
exports.createprojet=asyncHandler(async(req,res)=>{
    const body=req.body
    const projets=await Projetmodel.create(body)
     res.status(201).json({data:projets})
   
});

// @desc    update specified projet
// @route   PUT api/projets/:id
// @access  Private
exports.updateprojet =asyncHandler(async(req,res,next)=>{
  const {id}=req.params;

  const projets = await Projetmodel.findOneAndUpdate(
    {_id:id},
    req.body,
    {new:true})//return apre update
  if(!projets)
    {
      return   next(new ApiError(`projets not found for this id ${id}`,404)); 
    }
  res.status(200).json({data: projets});  
})


// @desc    delete specified projet
// @route   DELETE api/projets/:id
// @access  Private
exports.deleteprojet =asyncHandler(async(req,res,next)=>{
   const {id}=req.params;
   const projets=await Projetmodel.findById(id);
   if(!projets)
    {
      return   next(new ApiError(`projet not found for this id ${id}`,404)); 
    }
    const deletes=await Projetmodel.deleteOne({_id:id});
  res.status(204).send();  
});
