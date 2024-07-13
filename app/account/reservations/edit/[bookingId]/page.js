import ActiveButton from '@/app/_components/ActiveButton';
import { updateBooking } from '@/app/_lib/actions';
import { getBooking, getCabin } from '@/app/_lib/data-service';

export default async function Page({ params }) {
    const bookingId = params.bookingId;

    const { cabinId, numGuests, observations } = await getBooking(bookingId);
    // console.log(cabinId, numGuests, observations, bookingId);

    const { maxCapacity } = await getCabin(cabinId);

    return (
        <div>
            <h2 className='font-semibold text-2xl text-accent-400 mb-7'>
                Edit Reservation #{bookingId}
            </h2>

            <form
                className='bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col'
                action={updateBooking}
            >
                <input type='hidden' value={bookingId} name='bookingId' />
                <div className='space-y-2'>
                    <label htmlFor='numGuests'>How many guests?</label>
                    <select
                        name='numGuests'
                        id='numGuests'
                        className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm'
                        required
                        defaultValue={numGuests}
                    >
                        <option value='' key=''>
                            Select number of guests...
                        </option>
                        {Array.from(
                            { length: maxCapacity },
                            (_, i) => i + 1
                        ).map((x) => (
                            <option value={x} key={x}>
                                {x} {x === 1 ? 'guest' : 'guests'}
                            </option>
                        ))}
                    </select>
                </div>

                <div className='space-y-2'>
                    <label htmlFor='observations'>
                        Anything we should know about your stay?
                    </label>
                    <textarea
                        name='observations'
                        className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm'
                        maxLength={1000}
                        defaultValue={observations}
                    />
                </div>

                <div className='flex justify-end items-center gap-6'>
                    <ActiveButton className='bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300'>
                        Update profile
                    </ActiveButton>
                </div>
            </form>
        </div>
    );
}
