'use server';

import { revalidatePath } from 'next/cache';
import { auth, signIn, signOut } from './auth';
import { supabase } from './supabase';
import { getBooking, getBookings } from './data-service';
import { redirect } from 'next/navigation';

export async function updateGuest(formData) {
    const session = await auth();
    if (!session) {
        throw new Error('You should ligin to be able to perform the operation');
    }

    const nationalID = formData.get('nationalID');
    const [nationality, countryFlag] = formData.get('nationality').split('%');

    if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) {
        throw new Error('National ID should be between 6 and 12 symbols');
    }

    const updateData = { nationalID, nationality, countryFlag };

    const { data, error } = await supabase
        .from('guests')
        .update(updateData)
        .eq('id', session.user.guestId);

    if (error) {
        console.error(error);
        throw new Error('Guest could not be updated, please try again later');
    }
    revalidatePath('/account/profile');
}

export async function updateBooking(formData) {
    const session = await auth();
    if (!session) {
        throw new Error('You should login to be able to perform the operation');
    }

    const bookingId = Number(formData.get('bookingId'));
    const { guestId } = await getBooking(bookingId);

    if (guestId !== session.user.guestId)
        throw new Error('You cannot edit this bookings');

    const updateData = {
        numGuests: Number(formData.get('numGuests')),
        observations: formData.get('observations').slice(0, 1000),
    };

    const { error } = await supabase
        .from('bookings')
        .update(updateData)
        .eq('id', bookingId)
        .select()
        .single();

    if (error) {
        console.error(error);
        throw new Error('Booking could not be updated');
    }

    revalidatePath(`/account/reservations`);
    revalidatePath(`/account/reservations/edit/${bookingId}`);
    redirect('/account/reservations');
}

// 2 args due to use of .bind in the form
export async function createBooking(bookingData, formData) {
    // DEBUG:
    // console.log(bookingData);
    // console.log(formData);

    // get user data
    const session = await auth();
    if (!session) {
        throw new Error('You should login to be able to perform the operation');
    }

    const newBooking = {
        ...bookingData,
        guestId: session.user.guestId,
        numGuests: Number(formData.get('numGuests')),
        observations: formData.get('observations').slice(0, 1000),
    };

    const { error } = await supabase.from('bookings').insert([newBooking]);

    if (error) {
        console.error(error);
        throw new Error('Booking could not be created');
    }

    // revalidatePath(`/account/reservations`);
    revalidatePath(`/cabins/${bookingData.cabinId}`);
    redirect('/cabins/thankyou');
}

export async function deleteReservation(bookingId) {
    const session = await auth();
    if (!session) {
        throw new Error(
            'You should log in to be able to perform the operation'
        );
    }

    const guestBookings = await getBookings(session.user.guestId);
    if (
        guestBookings.findIndex(
            (guestBooking) => guestBooking.id === bookingId
        ) < 0
    ) {
        throw new Error('You cannot delete this bookings');
    }
    const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', bookingId);

    if (error) {
        console.error(error);
        throw new Error('Booking could not be deleted');
    }
    revalidatePath('/account/reservations');
}

export async function signInAction() {
    await signIn('google', { redirectTo: '/account' });
}

export async function signOutAction() {
    await signOut({ redirectTo: '/' });
}
