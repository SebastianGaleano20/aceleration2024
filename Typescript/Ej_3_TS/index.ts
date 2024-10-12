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
    this.reservations.push(reservation);
  }

  cancelReservation(id: number): void {
    // Implementar
    const index = this.reservations.findIndex((r) => r.id === id);
    if (index !== -1) {
      this.reservations.splice(index, 1);
    }
  }

  getReservationsByDate(date: Date): Reservation[] {
    // Implementar: Devolver reservas para una fecha específica
    const reservationsByDate:Reservation[] = this.reservations.filter((reservation)=> reservation.checkInDate === date);
    return reservationsByDate;
  }

  calculateOccupancy(month: number, year: number): number {
    // Implementar: Calcular porcentaje de ocupación para un mes y año dados
  }
}