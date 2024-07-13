'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

function Filter() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathName = usePathname();

    const activeFilter = searchParams.get('capacity') ?? 'all';

    function handleFilter(filter) {
        const params = new URLSearchParams(searchParams);
        params.set('capacity', filter);
        router.replace(`${pathName}?${params.toString()}`, { scroll: false });
    }
    return (
        <div className='border border-primary-800 flex'>
            <FilterButton
                filter='all'
                handler={handleFilter}
                activeFilter={activeFilter}
            >
                All
            </FilterButton>
            <FilterButton
                filter='small'
                handler={handleFilter}
                activeFilter={activeFilter}
            >
                Small
            </FilterButton>
            <FilterButton
                filter='medium'
                handler={handleFilter}
                activeFilter={activeFilter}
            >
                Medium
            </FilterButton>
            <FilterButton
                filter='large'
                handler={handleFilter}
                activeFilter={activeFilter}
            >
                Large
            </FilterButton>
        </div>
    );
}

function FilterButton({ filter, handler, activeFilter, children }) {
    return (
        <button
            className={`px-5 py-2 hover:bg-primary-700 ${
                filter === activeFilter ? 'bg-primary-700 text-primary-50' : ''
            }`}
            onClick={() => handler(filter)}
        >
            {children}
        </button>
    );
}

export default Filter;
