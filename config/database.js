const mongoose = require("mongoose")

mongoose.connect(process.env.MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then((v)=>{
    console.log("DB connected successfully.");
})
.catch(error=>{
    console.log("Error connecting DB:");
    console.error(error);
    process.exit(1);
})