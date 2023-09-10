import { promises as fs } from "fs";
import { _dirname } from "../path.js"

const ruta = `${_dirname}/Json/products.json`

export default class Product{

    constructor(title, description, price, thumbnail, code, stock,status,id){
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
        this.status= status
        this.id = id
    }

}

  