const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema(
{
	urlField: {
		type: String,
		trim: true,min:5
	},

	fav: {
		type: Boolean,default:false
		
	},
	images: 
		[ String]
		
	,
	links: [ String],
	words: {
		type: Number,
		
	},

},
{ timestamps: true }
);

const Category = mongoose.model("category", categorySchema);

module.exports = Category;