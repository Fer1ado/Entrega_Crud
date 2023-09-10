import { promises as fs } from "fs";
import { _dirname } from "../path.js"

const rutaCarro = `${_dirname}/Json/carrito.json`;
const ruta = `${_dirname}/Json/products.json`

export default class CarritoManager {
  constructor() {
    this.carrito = [];
  }

  async getCarrito(){
    const producto = JSON.parse(await fs.readFile(rutaCarro, "utf-8"));
    return producto;
  }

  async getCarritoById(id) {
    const producto = JSON.parse(await fs.readFile(rutaCarro, "utf-8"))
    const entrega = producto.find((e) => e.id === parseInt(id));
    if(entrega){  
        return(`Encontramos ${entrega.cantidad} items en carrito del producto consultado`)}
        else{
        return("Ese producto no se encuentra en el carrito")}
    }

  async addCarrito(id) {
    const item = await this.founded(id);

    if (item === null) {
        console.log("producto inexistente")
      return "producto inexistente en tienda";
    }
    if (await this.isAdded(item.id)) {
      const vieneCarro = JSON.parse(await fs.readFile(rutaCarro, "utf-8"));
      const indx = vieneCarro.findIndex((e) => e.id === parseInt(item.id));
      const nuevoValor = vieneCarro[indx].cantidad + 1;
      const creado = { id: item.id, cantidad: nuevoValor };
      let nuevoJson = vieneCarro.filter((prod) => prod.id != item.id);
      let remplazo = nuevoJson.concat(creado);
      await fs.writeFile(rutaCarro, JSON.stringify(remplazo));
      return (`Hay ${creado.cantidad} unidades del producto ${creado.id} en Carrito `);
    } else {
      const crear = { id: item.id, cantidad: 1 };
      const vieneCarro = JSON.parse(await fs.readFile(rutaCarro, "utf-8"));
      const remplazo = vieneCarro.concat(crear);
      await fs.writeFile(rutaCarro, JSON.stringify(remplazo));
      return (`Producto ${crear.id} agregado a carrito`);
    }
  }

  async isAdded(id) {
    const produ = JSON.parse(await fs.readFile(rutaCarro, "utf-8"));
    return produ.some((e) => e.id === id);
  }

  async founded(id) {
    const produ = JSON.parse(await fs.readFile(ruta, "utf-8"));
    const item = produ.find((e) => e.id === id);
    if (item) {
      return item;
    } else {
      return null;
    }
  }

}

const carro = new CarritoManager()




