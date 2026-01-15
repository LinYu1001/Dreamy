const express = require("express");
const cors = require("cors");

const postsRoute = require("./routes/post");
const contactsRoute = require("./routes/contact");

const PORT = process.env.PORT || 4000

const app = express();  
app.use(cors());
app.use(express.json());

app.use("/api/posts", postsRoute);
app.use("/api/contacts", contactsRoute);

app.listen(PORT, () => {
  console.log("Server running at http://localhost:3000");
});
