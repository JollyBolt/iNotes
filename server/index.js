require('dotenv').config()

const connectToMongo = require('./db')
const express = require('express')
// const cors = require('cors')

const app = express()
const port = process.env.PORT

app.use(express.json())
// app.use(cors({
//   // origin:["*"],
//   origin:['https://inotes-oyvc.onrender.com'],
//   methods:["GET","POST","PUT","DELETE"],
//   credentials:true
// }))

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://inotes-oyvc.onrender.com"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Private-Network", true);
  //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
  res.setHeader("Access-Control-Max-Age", 7200);

  next();
});


app.use("/api/auth",require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'))

app.get('/', (req, res) => {
    res.json('Hello World')
})

app.listen(port, async () => {
  await connectToMongo()
  console.log(`App listening on port ${port}`)
})
