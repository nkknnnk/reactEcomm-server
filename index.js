const express = require('express');
const products = require('./data/products')
const dotenv = require('dotenv')
const connectDb = require('./config/config')
const productRoutes = require('./routes/productRoute')
const cors = require('cors')
const {errorHandler} = require('./middlewares/errorMiddleware')
const usersRoutes = require("./routes/UsersRoute");



// dotenv donfig
dotenv.config()

const app = express();
// Allow origin
app.use(cors({
    origin: 'http://localhost:3000'
}));
// connecting to mongodb database
connectDb()

//middleware bodyparser
app.use(express.json());

app.use('/api', productRoutes)
app.use('/api/users', usersRoutes)


app.use(errorHandler)



app.get("/", (req, res)=>{
    res.send("Hello Node.js")
})
app.get("/products", (req, res)=>{
    res.json(products)
})
app.get("/products/:id", (req, res)=>{
    const product = products.find(p=>p._id===req.params.id)
    res.json(product)
})
app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})