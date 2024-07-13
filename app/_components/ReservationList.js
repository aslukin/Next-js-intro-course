'use client';

import { deleteReservation } from '../_lib/actions';
import ReservationCard from './ReservationCard';
import { useOptimistic } from 'react';

function ReservationList({ bookings }) {
    const [optisticBookings, optimisticDelete] = useOptimistic(
        bookings,
        (currentBookings, bookingId) => {
            return currentBookings.filter(
                (booking) => booking.id !== bookingId
            );
        }
    );

    async function handleDelete(bookingId) {
        optimisticDelete(bookingId);
        await deleteReservation(bookingId);
    }

    return (
        <ul className='space-y-6'>
            {optisticBookings.map((booking) => (
                <ReservationCard
                    booking={booking}
                    key={booking.id}
                    onDelete={handleDelete}
                />
            ))}
        </ul>
    );
}

export default ReservationList;
