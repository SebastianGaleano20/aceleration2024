/* Gestor de tareas con prioridades

Pautas:
- Crea una clase Task con propiedades como título, descripción, fecha de vencimiento y prioridad.✅
- Implementa métodos para agregar, eliminar y ordenar tareas.
- Utiliza sort para ordenar las tareas por prioridad.

Datos iniciales:

javascript
const initialTasks = [
  { id: 1, title: "Completar informe", description: "Finalizar informe trimestral", dueDate: "2024-03-15", priority: 2 },
  { id: 2, title: "Reunión con cliente", description: "Presentar propuesta de proyecto", dueDate: "2024-03-10", priority: 1 },
  { id: 3, title: "Actualizar software", description: "Instalar últimas actualizaciones", dueDate: "2024-03-20", priority: 3 }
];
*/

class Task{
    constructor(title,description,  dueDate, priority){
        this.title = title,
        this.description = description,
        this.dueDate = dueDate,
        this.priority = priority
    }
}
