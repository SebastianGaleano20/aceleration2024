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
    // Implementar
  }

  getTotalValue(): number {
 // Implementar: Calcular el valor total del inventario
  }

  getLowStockProducts(threshold: number): Product[] {
  // Implementar: Devolver productos con cantidad menor al umbral
  }
}

