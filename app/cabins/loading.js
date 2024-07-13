import Spinner from '../_components/Spinner';

export default function LoadingCabins() {
    return (
        <div className='grid items-center justify-center'>
            <Spinner message='' />
            <span className='text-xl text-primary-200'>Loading cabin data</span>
        </div>
    );
}
