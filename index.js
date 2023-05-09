const express = require("express")
const app = express()
const routesProducts = require("./routes/products")
const routesCart = require("./routes/cart")

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/static", express.static(__dirname+"/public"))

app.use("/api/products", routesProducts)
app.use("/api/cart", routesCart)

app.listen(8080, ()=> {
    console.log("Server run on port 8080",)
})