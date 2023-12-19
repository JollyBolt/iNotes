require('dotenv').config()

const connectToMongo = require('./db')
const express = require('express')
const cors = require('cors')

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(cors({
  origin:["*"],
  // origin:['https://inotes-frontend-iota.vercel.app/','https://inotes-frontend-322jl35f4-ishan-sens-projects.vercel.app/'],
  methods:["GET","POST","PUT","DELETE"],
  credentials:true
}))

app.use("/api/auth",require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'))

app.get('/', (req, res) => {
    res.json('Hello World')
})

app.listen(port, async () => {
  await connectToMongo()
  console.log(`App listening on port ${port}`)
})
