import ProductManager from "../Clases/productManager.js";
import { Router } from "express";
import {productModel} from "../Models/products.models.js"

const prodRoute = Router();
const ejecutar = new ProductManager();


//pedido de productos por ID
prodRoute.get("/:pid", async (req, res) => {
  const pid = req.params.pid;
  res.send(await ejecutar.getProductById(parseInt(pid)));
});

//Pedido de listado completo
prodRoute.get("/", async (req, res) => {
  const {limit} = req.query
  try{
    const prods = await productModel.find().limit(limit)
    res.status(200)({respuesta: "ok", mensage: prods})
  }catch(err){
    res.status(400)({respuesta: "error al consultar productos", mensage: err})
  }

  //res.send(await ejecutar.getProducts());
});

prodRoute.get("/:pid", async (req, res) => {
  const pid = req.params.pid;
  
  try{
    const prod = await productModel.findById(pid)
    if(prod){
      res.status(200).send({respuesta: "ok", mensage: prods})
    }else{
      res.status(404)({respuesta: "error al consultar producto", mensage: "Not Found"})
    }
  }catch(err){
    res.status(400)({respuesta: "error al consultar producto", mensage: err})
  }
  
  
  
  
  //res.send(await ejecutar.getProductById(parseInt(pid)));
});

//SUBIDA DE PRODUCTOS
prodRoute.post("/", async (req, res) => {
  const {title,description,stock,status,code,price,category} = req.body

  try{
    const prod = await productModel.create({title,description,stock,status,code,price,category})
    if(prod){
      res.status(200).send({respuesta: "ok", mensage: prod})
    }else{
      res.status(404)({respuesta: "error al crear producto", mensage: "Not Found"})
    }
  }catch(err){
    res.status(400)({respuesta: "error al crear producto", mensage: err})
  }
  
  /*
  const producto = await ejecutar.addProduct(req.body);

  if (
    producto === "Producto Incompleto, todos los campos deben tener información"
  ) {
    return res.status(400).send(producto);
  }
  if (producto === "Producto repetido") {
    return res.status(400).send(producto);
  } else {
    return res.status(200).send(producto);
  }*/
});

//EDITADO DE PRODUCTO
prodRoute.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {title,description,stock,code,price,category} = req.body

  try{
    const prod = await productModel.findById(id, {title,description,stock,code,price,category})
    if(prod){
      res.status(200).send({respuesta: "ok", mensage: "Producto Actualizado"})
    }else{
      res.status(404)({respuesta: "error al actualizar producto", mensage: "Not Found"})
    }
  }catch(err){
    res.status(400)({respuesta: "error al actualizar producto", mensage: err})
  }

 /* const producto = await ejecutar.updateProduct(id, req.body);
  if (producto === "Producto no encontrado") {
    return res.status(400).send(producto);
  } else {
    return res.status(200).send(producto);
  }*/
});

//BORRADO PRODUCTO
prodRoute.delete("/:id", async (req, res) => {
  const { id } = req.params;


  try{
    const prod = await productModel.findByIdAndDelete(id)
    if(prod){
      res.status(200).send({respuesta: "ok", mensage: "Producto Eliminado"})
    }else{
      res.status(404)({respuesta: "error al Eliminar producto", mensage: "Not Found"})
    }
  }catch(err){
    res.status(400)({respuesta: "error al Eliminar producto", mensage: err})
  }

  /*
  const producto = await ejecutar.deleteProduct(id);

  if (producto === "producto no encontrado") {
    return res.status(400).send(producto);
  } else {
    return res.status(200).send(producto);
  }*/
});

export default prodRoute;
