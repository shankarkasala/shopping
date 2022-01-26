const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const shortid= require("shortid")

const app = express()
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/shop-db",{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
})
const Product = mongoose.model(
    "products", 
    new mongoose.Schema({
    _id : {type :String, default: shortid.generate},
    image : String,
    title : String,
    description : String,

    availableSizes: [String],

    price : Number,

}))
app.get("/api/products", async(req, res)=>{
const products=await Product.find({})
res.send(products)
})
app.post("/api/products",async (res, req)=>{
    const newProduct = new Product(req.body)
    const saveProduct = await newProduct.save()
    res.send(saveProduct)
    console.log(saveProduct)
})
app.delete("/api/products/:id",async (res, req)=>{
    const deletedproduct = await Product.findByIdAndDelete(req.params.id)
    res.send(deletedproduct)
})
const port= process.env.PORT || 5000
app.listen(port,()=> console.log("server at http://localhost:5000"))