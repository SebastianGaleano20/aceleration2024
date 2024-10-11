/*
Generador de informes de gastos
Pautas:
- Crea clases para Expense y ExpenseReport.
- Implementa metodos para agregar gastos, calcular totales por categoría y generar un informe resumido.
- Utiliza metodos de array como filter y reduce para procesar los datos.

Datos iniciales:
const initialExpenses = [
  { id: 1, description: "Almuerzo de negocios", amount: 55.50, category: "Comida", date: "2024-03-01" },
  { id: 2, description: "Taxi al aeropuerto", amount: 30.00, category: "Transporte", date: "2024-03-02" },
  { id: 3, description: "Hotel", amount: 200.00, category: "Alojamiento", date: "2024-03-02" },
  { id: 4, description: "Cena con cliente", amount: 80.00, category: "Comida", date: "2024-03-03" },
  { id: 5, description: "Vuelo de regreso", amount: 350.00, category: "Transporte", date: "2024-03-04" }
];

*/
class Expense {
    constructor(id, description, amount, category, date) {
        this.id = id;
        this.description = description;
        this.amount = amount;
        this.category = category;
        this.date = date;
    }
}

class ExpenseReport {
    constructor(expenses) {
        this.expenses = expenses;
    }

    totalExpensesForCategory(category) {
        const total = expenses
            .filter(expense => expense.category === category)
            .reduce((total, expense) => total + expense.amount, 0)
        return `El total de gastos sobre la categoria "${category}" es: ${total}`;
    };
    
    addExpense(id, description, amount, category, date){
        const createExpense = new Expense(id, description, amount, category, date);
        this.expenses.push(createExpense);
     }

    getExpenses() {
        return expenses;
    }
}

/*
Practica extensa
const expense1 = new Expense(1, "Almuerzo de negocios", 55.50, "Comida", "2024-03-01");
const expense2 = new Expense(2, "Taxi al aeropuerto", 30.00, "Transporte", "2024-03-02");
const expense3 = new Expense(3, "Hotel", 200.00, "Alojamiento", "2024-03-02");
const expense4 = new Expense(4, "Cena con cliente", 80.00, "Comida", "2024-03-03");
const expense5 = new Expense(5, "Vuelo de regreso", 350.00, "Transporte", "2024-03-04");

const expenses = [expense1, expense2, expense3, expense4, expense5];
*/

//Array mejorado
const expenses = [
    new Expense(1, "Almuerzo de negocios", 55.50, "Comida", "2024-03-01"),
    new Expense(2, "Taxi al aeropuerto", 30.00, "Transporte", "2024-03-02"),
    new Expense(3, "Hotel", 200.00, "Alojamiento", "2024-03-02"),
    new Expense(4, "Cena con cliente", 80.00, "Comida", "2024-03-03"),
    new Expense(5, "Vuelo de regreso", 350.00, "Transporte", "2024-03-04")
];

const reportExpense = new ExpenseReport(expenses);

const newExpense = reportExpense.addExpense(6, "Cena con cliente", 80.00, "Comida", "2024-03-03");

const totalComida = reportExpense.totalExpensesForCategory("Comida");
console.log(totalComida)
const totalTransporte = reportExpense.totalExpensesForCategory("Transporte");
console.log(totalTransporte)
const totalAlojamiento = reportExpense.totalExpensesForCategory("Alojamiento");
console.log(totalAlojamiento)

const resume = reportExpense.getExpenses();
console.log(resume);