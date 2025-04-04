const mongoose=require('mongoose')

const masterSchema=new mongoose.Schema({
    createdAt:{type:Date,default:Date.now}  //create cheytha time kanikan now use cheyunnu
},
{
    updatedAt:{ype:Date,default:Date.now},   //UPDATE CHEYUNNATH KANIKKAN
    updatedBy:{

    },
    isActive:{type:Boolean,default:true}                                         
})

module.exports=masterSchema //schemane ella modelsilekum inherit cheyan
