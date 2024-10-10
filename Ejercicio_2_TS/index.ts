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
    // Implementar
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