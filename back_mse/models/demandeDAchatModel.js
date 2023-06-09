const  mongoose=require('mongoose');


const demandedachatShema=new mongoose.Schema(
    {
        quantite:{
            type:Number,
            trim:true,
            require:[true,'number require']
        },
        isConfirmed:{
            type:Boolean,
            default:false
        },
        description:{
            type:String,
            trim:true,
            require:[false,'title require']
        },
       
        id_produit:{
            type:mongoose.Schema.ObjectId,
            ref:'produit',
            require:[false,'id_produit require']
        }
    },{timestamps:true}
);


const Demandedachat=mongoose.model('demandedachat',demandedachatShema);
module.exports=Demandedachat;