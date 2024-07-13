import { getCabins } from '@/app/_lib/data-service';

import CabinCard from './CabinCard';

async function CabinList({ filter }) {
    const cabins = await getCabins();
    let displayCabins;

    if (filter === 'small')
        displayCabins = cabins.filter((cabin) => cabin.maxCapacity <= 2);
    if (filter === 'medium')
        displayCabins = cabins.filter(
            (cabin) => cabin.maxCapacity > 2 && cabin.maxCapacity <= 6
        );
    if (filter === 'large')
        displayCabins = cabins.filter((cabin) => cabin.maxCapacity > 6);
    if (filter === 'all') {
        displayCabins = cabins;
    }

    if (!cabins.length) return null;

    return (
        <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14'>
            {displayCabins.map((cabin) => (
                <CabinCard cabin={cabin} key={cabin.id} />
            ))}
        </div>
    );
}

export default CabinList;