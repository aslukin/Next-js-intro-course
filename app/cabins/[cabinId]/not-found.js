import Link from 'next/link';

function NotFound() {
    return (
        <main className='text-center space-y-6 mt-4'>
            <h1 className='text-3xl font-semibold'>
                <p>This cbain you choose can not be found :(</p>
                <p>Please try to choose another one</p>
            </h1>
            <Link
                href='/cabins'
                className='inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg'
            >
                Back to cabins list
            </Link>
        </main>
    );
}

export default NotFound;
