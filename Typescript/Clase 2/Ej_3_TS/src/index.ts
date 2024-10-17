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

const date1 = "2024-10-17";
const date2 = "2024-10-18";
const date3 = "2024-10-19";
const date4 = "2024-10-20";

const outDate1 = "2024-11-18";
const outDate2 = "2024-11-19";
const outDate3 = "2024-11-20";
const outDate4 = "2024-11-21";


const reservation: Reservation = {
    id: 1,
     guestName: "Seba",
  roomType: "suite",
  checkInDate: new Date(date1),
  checkOutDate: new Date(outDate4)
};
const reservation2: Reservation = {
    id: 2,
     guestName: "Seba",
  roomType: "suite",
  checkInDate: new Date(date2),
  checkOutDate: new Date(outDate1)
};
const reservation3: Reservation = {
    id: 3,
     guestName: "Seba",
  roomType: "suite",
  checkInDate: new Date(date3),
  checkOutDate: new Date(outDate2)
};
const reservation4: Reservation = {
    id: 4,
     guestName: "Seba",
  roomType: "suite",
  checkInDate: new Date(date4),
  checkOutDate: new Date(outDate3)
};

systemOn.makeReservation(reservation)
console.log(systemOn.getReservations())

console.log(systemOn.getReservationsByDate(new Date("2024-10-17")))