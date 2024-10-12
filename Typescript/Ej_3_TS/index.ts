//Ejercicio 3
//Sistema de reservas de hotel

type RoomType = "single" | "double" | "suite";

interface Reservation {
  id: number;
  guestName: string;
  roomType: RoomType;
  checkInDate: Date;
  checkOutDate: Date;
}

class ReservationSystem {
  private reservations: Reservation[] = [];

  makeReservation(reservation: Reservation): void {
    // Implementar
  }

  cancelReservation(id: number): void {
    // Implementar
  }

  getReservationsByDate(date: Date): Reservation[] {
    // Implementar: Devolver reservas para una fecha especÃ­fica
  }

  calculateOccupancy(month: number, year: number): number {
    // Implementar: Calcular porcentaje de ocupaciÃ³n para un mes y aÃ±o dados
  }
}