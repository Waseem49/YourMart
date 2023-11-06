const connection = require("./config/connectDB");
require("dotenv").config({ path: "./config/config.env" });

const { app } = require("./app");

app.listen(5000, async () => {
  try {
    await connection;
    console.log(`Server listening on ${process.env.PORT}`);
  } catch (error) {
    console.log("err :" + error.message);
  }
});
