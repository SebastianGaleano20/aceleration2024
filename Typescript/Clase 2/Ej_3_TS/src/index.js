"use strict";
//Ejercicio 3
//Sistema de reservas de hotel
class ReservationSystem {
    constructor() {
        this.reservations = [];
    }
    makeReservation(reservation) {
        // Implementar
        this.reservations.push(reservation);
    }
    cancelReservation(id) {
        // Implementar
        const index = this.reservations.findIndex((r) => r.id === id);
        if (index !== -1) {
            this.reservations.splice(index, 1);
        }
    }
    getReservationsByDate(date) {
        // Implementar: Devolver reservas para una fecha específica
        const reservationsByDate = this.reservations.filter((reservation) => reservation.checkInDate === date);
        return reservationsByDate;
    }
    calculateOccupancy(month, year) {
        // Implementar: Calcular porcentaje de ocupación para un mes y año dados
    }
}
