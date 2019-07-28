import mongoose from "mongoose";
const uri = "mongodb+srv://avelix:avelix@cluster0-w6nkt.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
    console.log("db connect");
});

export {db};

