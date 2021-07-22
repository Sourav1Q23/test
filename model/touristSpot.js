const mongoose = require('mongoose');
const {default:slugify} =require('slugify');

const touristSpotSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'A tourist spot must have a name'],
        unique:true,
        trim:true,
        maxlength:40,
        minlength:8
    },
    type:{
        type:String,
        required:[true, 'A tour must have a type'],
        enum:{
            values:['Historical','Forest','Hill','Sea-beach','Waterfall', 'Island','Museum','Park', 'Reacreation Center','Zoo','Others'],
            message:"This type is not allowed"
        }

    },
    price:{
        type:Number,
        required:[true, 'A tour must have a price']
    },
    slug:String,
    summary:{
        type:String,
        trim:true,
        required:[true, 'A tour must have a summary'],
        maxlength: 160,
        minlength:60
    },
    description:{
        type:String,
        trim:true,
        required:[true, 'A tour must have a description'],
    },
    imageCover:{
        type:String,
        required:[true, 'A tour must a have cover image']
    },
    images:[String],
    createdAt:{
        type:Date,
        default:Date.now(),
        select: false
    },
    direction:{
        type:String,
        trim:true,
        required:[true, 'A tour must have a description']
    },
    location:{
        type: {
            type: String,
            default:'Point',
            enum:['Point']
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        },
        address:String
    }},
    {
        toJSON: {virtuals:true},
        toObject: { virtuals:true}
    }
);

touristSpotSchema.pre('save',function(next){
    this.slug = slugify(this.name,{lower:true});
    next();
});

const TouristSpot = mongoose.model('TouristSpot', touristSpotSchema);

module.exports = TouristSpot;