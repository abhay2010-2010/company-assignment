const express = require("express");
const app = express();
const cors = require("cors");
const connectToDB = require("./config/config");
const userRoute = require("./routes/user");

app.use(cors());
app.use(express.json())
app.get('/', (req, res) => {
    res.send("Welcome to the Express Server!");
})
app.use("/user", userRoute)
app.listen(8080, async () => {
    try {
        await connectToDB;
        console.log("Server is running on port 8080");
    } catch (error) {
        console.log("Error connecting to db");
    }

})