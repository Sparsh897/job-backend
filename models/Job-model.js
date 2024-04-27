const moongoose =require('mongoose');


const JobSchema=new moongoose.Schema({

title:{type: String,required:true},
location:{type: String,required:true},
description:{type: String,required:true},
agentName:{type: String,required:true},
salary:{type: String,required:true},
period:{type: String,required:true},
hiring:{type: Boolean,required:true,default:true},
contract:{type: String,required:true},
requirements:{type: Array,required:true},
imageUrl:{type: String,required:true},
agentId:{type: String,required:true}


},{timestamps:true});

module.exports = moongoose.model('Job',JobSchema);