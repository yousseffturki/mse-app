const usermodel=require('../models/userModel')
const projetModel=require('../models/projetModel')

const asyncHandler = require('express-async-handler')
const ApiError=require('../utils/apiError')
const bcrypt=require('bcryptjs');

const {uploadSingleImage}= require('../middlewares/uploadImageMiddleware')
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');
exports.uploadUserImage = uploadSingleImage('image')
// Image processing
exports.resizeImage = asyncHandler(async (req, res, next) => {
    const filename= `user-${uuidv4()}-${Date.now()}.jpeg`;
    if(req.file){
    await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat('jpeg')
    .jpeg({ quality: 95 })
    .toFile(`uploads/users/${filename}`);
    // Save image into our db
    req.body.image = filename;}
    next();
    });
// @desc    Get all user
// @route   GET api/users/
// @access  Private
exports.getusers=asyncHandler(async(req,res) => {
    const page=req.query.page*1 || 1;
    const limit=req.query.limit*1 ||5;
    const skip=(page-1)*limit;
    const users = await usermodel.find({});
    res.status(200).json({results:users.length,page,data:users})
  });

  exports.getusersByProject=asyncHandler(async(req,res) => {
    const {id} = req.params;
    const users = await usermodel.find({projetid:id,role:"technicien"});
    res.status(200).json(users)
  });

  exports.getTechniciens=asyncHandler(async(req,res) => {
    const {id} = req.params;
    const users = await usermodel.find({role:"technicien",projetid:null});
    res.status(200).json(users)
  });
// @desc    Get specific user by d
// @route   GET api/users/:id
// @access  Private
exports.getuser = asyncHandler(async(req,res,next)=>{
  const {id}=req.params; 
  const users = await usermodel.findById(id);
  if(!users)
  {
    return   next(new ApiError(`user not found for this id ${id}`,404)); 
}
  res.status(200).json({data: users});
})

// @desc    Create a new user
// @route   POST api/users/
// @access  Private
exports.createuser=asyncHandler(async(req,res)=>{
    const body=req.body
    const users=await usermodel.create(body)
     res.status(201).json({data:users})
   
});

// @desc    update specified user
// @route   PUT api/users/:id
// @access  Private
exports.updateuser =asyncHandler(async(req,res,next)=>{
  const {id}=req.params;

  const users = await usermodel.findOneAndUpdate(
    {_id:id},
    {last_name:req.body.last_name,
    first_name:req.body.first_name,
    email:req.body.email,
    role:req.body.role},
    {new:true})//return apre update
  if(!users)
    {
      return   next(new ApiError(`users not found for this id ${id}`,404)); 
    }
  res.status(200).json({data: users});  
})


// @desc    delete specified user
// @route   DELETE api/users/:id
// @access  Private
exports.deleteuser =asyncHandler(async(req,res,next)=>{
   const {id}=req.params;
   const users=await usermodel.findByIdAndDelete(id);
   if(!users)
    {
      return   next(new ApiError(`user not found for this id ${id}`,404)); 
    }
  res.status(204).send();  
});

// @desc    update password
// @route   PUT api/users/:id
// @access  Private
exports.changeuserpassword=asyncHandler(async(req,res)=>{
    const users = await usermodel.findOneAndUpdate(
        {_id:req.params.id},
        {password:await bcrypt.hash(req.body.password,12)},
        {new:true})
        if(!users)
        {
          return   next(new ApiError(`users not found for this id ${id}`,404)); 
        }
      res.status(200).json({data: users});  
})

// @desc    update password
// @route   PUT api/users/passwordrecovery
// @access  Private
exports.passwordrecovery=asyncHandler(async(req,res)=>{
  const users = await usermodel.findOneAndUpdate(
      {email:req.body.email},
      {password:await bcrypt.hash(req.body.password,12)},
      {new:true})
      if(!users)
      {
        return   next(new ApiError(`users not found for this email ${req.body.email}`,404)); 
      }
    res.status(200).json({data: users});  
})


exports.dashboardUserStatistics = asyncHandler(async(req,res)=>{
   const technicien = await usermodel.find({"role":"technicien"}).count();
   const superviseur = await usermodel.find({"role":"superviseur"}).count();
   const client = await usermodel.find({"role":"client"}).count();
   const projet = await projetModel.find({"status":"fini"}).count();


   const json = {
    "technicien": technicien,
    "superviseur": superviseur,
    "client":client,
    "projet":projet
   }
   return res.status(200).json(json);

})