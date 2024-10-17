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
  getReservations():Reservation[]{
   return this.reservations
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

 // calculateOccupancy(month: number, year: number): number {
    // Implementar: Calcular porcentaje de ocupación para un mes y año dados
  //}
}

const systemOn = new ReservationSystem();

const checkInDateString = "2024-10-17";
const checkOutDateString = "2024-10-18";

const reservation: Reservation = {
    id: 1,
     guestName: "Seba",
  roomType: "suite",
  checkInDate: new Date(checkInDateString),
  checkOutDate: new Date(checkOutDateString)
};
const reservation2: Reservation = {
    id: 2,
     guestName: "Seba",
  roomType: "suite",
  checkInDate: new Date(checkInDateString),
  checkOutDate: new Date(checkOutDateString)
};

systemOn.makeReservation(reservation)
//console.log(systemOn.getReservations())

console.log(systemOn.getReservationsByDate(new Date("2024-10-17")))