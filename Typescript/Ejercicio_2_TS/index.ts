//Gestor de inventario

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

class Inventory {
  private products: Product[] = [];

  addProduct(product: Product): void {
    //Validamos si existe el producto
    const existingProduct = this.products.find((p) => p.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += product.quantity; //Si existe actualizamos la cantidad
    }else{
        this.products.push(product) //Si no existe, se agrega a la lista
    }
  }

  updateStock(id: number, newQuantity: number): void {
    const product = this.products.find((product) => product.id === id); //Buscamos el producto
    if (product) {
      product.quantity = newQuantity; //Actualizamos la cantidad
    }
  }

  getTotalValue(): number {
    let total = 0;
    this.products.forEach((product) => {
      total += product.price * product.quantity; //Iteramos sobre cada producto su precio y cantidad para sumarlo al total
    });
    return total; //Retornamos el total
  }

  getLowStockProducts(threshold: number): Product[] {
    let lowStockProducts: Product[] = [];
    this.products.filter((product) => {
      if (product.quantity < threshold) { //Filtramos los productos con cantidad menor al umbral
        //Añadimos a la lista
        lowStockProducts.push(product);
      }
    });
    return lowStockProducts; //Retornamos la lista
  }
}

