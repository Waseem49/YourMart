const connection = require("./config/connectDB");
const PORT = process.env.PORT || 5000;
const { app } = require("./app");

app.listen(PORT, async () => {
  try {
    await connection;
    console.log(`Server listening on ${PORT}`);
  } catch (error) {
    console.log("err :" + error.message);
  }
});
