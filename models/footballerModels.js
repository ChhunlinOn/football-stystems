const mongoose =require('mongoose') ;

const footballerSchema = new mongoose.Schema({
    name: { type: String, required: true },                
    age: { type: Number, required: true },                  
    position: { type: String, required: true },             
    nationality: { type: String, required: true },          
    club: { type: String, required: true },                 
    shirtNumber: { type: Number, required: true },                      
    birthDate: { type: Date, required: true },       
},{ timestamps: true }) ;

module.exports = mongoose.model ("footballer" , footballerSchema);


              