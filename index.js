const express = require("express")
const app = express()
const PORT = 8080
const uuid4 = require("uuid")

let products = []

app.use(express.json())

app.get("/productos", (req, res)=>{
    res.send({data:products, message:"Todos los productos enviados"})
})

app.post('/createProduct', (req, res)=> {
    // body
    let id = uuid4()
    let pr = req.body
    pr.id = id
    products.push(pr)
    res.send({data:pr, message:'Producto guardado correctamente'})
})

app.delete("/deleteProduct/:id", (req, res)=> {
    console.log(req.params)
    let id = req.params.id
    const arrayNew = products.filter(()=> {
        return Element.id !== id
    })
    console.log(arrayNew)
    products = arrayNew
    res.send({data:products, message:"Producto eliminado correctamente"})
})

app.put("/updateProduct/:id", (req, res)=> {
    let id = req.params.id
    let infoNew = req.body

    let arrayUpdated = products.map((ele)=>{
        if(ele.id == id){
            return {...ele, infoNew} 
        } else {
            return ele
        }
    })
    console.log(arrayUpdated)
    products = arrayUpdated
    res.send({data:products, message:"Producto actualizado correctamente"})
})

app.listen(PORT, ()=> {
    console.log("Server run on port 8080", PORT)
})