import Product from "./Productos.js"
import { _dirname } from "../path.js"
import { promises as fs } from "fs";
import ProductManager from "../Clases/productManager.js";
///////////////////////////////////////////////////////////////////////////////////////
///CREACION DE ITEMS

const producto1 = new Product(
    "manzana",
    "roja",
    550,
    "http://thumbnail.com",
    "MM284",
    76,
    true,
    1
  );
  const producto2 = new Product(
    "Pera de Agua",
    "Pera de agua o Blanquilla: Son peras de tamaño medio,",
    687,
    "foto",
    "MM248",
    54,
    true,
    1
  );
  const producto3 = new Product(
    "mandarina",
    "naranja",
    354,
    "http://thumbnail.com",
    "MA275",
    206,
    true,
    1
  );
  const producto4 = new Product("Mango", "dulce", 845, [], "PI265", 126);
  const producto5 = new Product(
    "Manzana Fuji",
    "Manzana Fuji: Es una variedad de manzana originaria de Japón",
    500,
    "foto",
    "MM249",
    32,
    true,
    1
  );
  const producto6 = new Product(
    "Banana",
    "Banana: Es una fruta tropical originaria del sudeste asiático.",
    300,
    "foto",
    "MM250",
    12,
    true,
    1
  );
  
  const producto7 = new Product(
    "Mango",
    "El mango es una fruta tropical originaria del sur y sureste asiático.",
    199,
    "foto",
    "MNGO-001",
    100,
    true,
    1
  );
  
  const producto8 = new Product(
    "Piña",
    "La piña es una fruta tropical originaria de América del Sur. ",
    120,
    "foto",
    76,
    true,
    1
  );
  
  const producto9 = new Product(
    "Ñame",
    "El ñame es un tubérculo originario de África y Asia.",
    159,
    "foto",
    "YAM-001",
    100,
    true,
    1
  );
  
  const producto10 = new Product(
    "Batata",
    "La batata es un tubérculo originario de América del Sur.",
    199,
    "foto",
    "BT-001",
    100,
    true,
    1
  );
  

 
  const ejecutar = new ProductManager();
  
  export default async function primerboot() {
    const producto = JSON.parse( await fs.readFile(`${_dirname}/Json/products.json`, "utf-8"));
   
  
    if (producto.length === 0) {
      ejecutar.addProduct(producto1);
      ejecutar.addProduct(producto2);
      ejecutar.addProduct(producto3);
      ejecutar.addProduct(producto4);
      ejecutar.addProduct(producto5);
      ejecutar.addProduct(producto6);
      ejecutar.addProduct(producto7);
      ejecutar.addProduct(producto8);
      ejecutar.addProduct(producto9);
      ejecutar.addProduct(producto10);
  
      return;
    } else {
      return console.log("Todo listo");
    }
  }