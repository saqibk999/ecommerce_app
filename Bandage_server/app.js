const express = require("express");
const dotenv=require('dotenv')
const morgan= require('morgan')
const cors = require("cors");
const routes = require("./routes/index");
dotenv.config({ path: './config.env' });

const app = express();
app.use(cors({ origin: "*" }));
app.use(morgan("dev"))
app.use(express.json());
app.use("/", routes);

const port = 4000;





app.listen(port, () => console.log(`server listening at port ${port}....`));
