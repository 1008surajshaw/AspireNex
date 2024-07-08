const mongoose = require("mongoose")
const userSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            require:true,
            trim:true,
        },
        title: { 
            type: String,
             required: true
         },
        role: { 
            type: String, 
            required: true 
        },
        email: {
			type: String,
			required: true,
			trim: true,
		},
        password: {
			type: String,
			required: true,
		},
        task :[{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Task",
        },
        ],
        token :{
            type: String,
        },
        resetPasswordExpires: {
			type: Date,
		},
        image: {
			type: String,
			required: true,
		},
        additionalDetails: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Profile",
		},
        isAdmin: {
             type: Boolean,
              required: true, 
              default: false 
         },
        isActive: { 
            type: Boolean, 
            required: true, 
            default: true 
        },

    },
    { timestamps: true }

)
 module.exports = mongoose.model("User",userSchema);