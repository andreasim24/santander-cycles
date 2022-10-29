import { Combobox, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';

import useDebounce from '@/hooks/useDebounce';

import { BikePointType } from '@/stores/bikeStore';
import useBikeStore from '@/stores/bikeStore';

export default function BikePointList() {
  const [filter, setFilter] = useState<string>();
  const filteredBikePoints = useBikeStore((state) => state.filteredBikePoints);
  const setFilteredBikePoints = useBikeStore(
    (state) => state.setFilteredBikePoints
  );
  const setSelectedBikePoint = useBikeStore(
    (state) => state.setSelectedBikePoint
  );
  const debouncedSearch = useDebounce(filter, 400);

  useEffect(() => {
    setFilteredBikePoints(debouncedSearch);
  }, [debouncedSearch, setFilteredBikePoints]);

  return (
    <div className='bg-card-map h-[200px] space-y-2 bg-cover bg-center p-4 xl:h-[450px]'>
      <h3 className='text-center text-black'>Docking Station</h3>
      <Combobox
        as='div'
        value={filteredBikePoints}
        onChange={setSelectedBikePoint}
      >
        <div className='relative mt-1'>
          <div className='relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm'>
            <Combobox.Input
              className='w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0'
              onChange={(event) => setFilter(event.target.value)}
              displayValue={(selectedBikePoint: BikePointType) =>
                selectedBikePoint?.commonName
              }
              placeholder='Eg: River Street'
            />
            <Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
              <BiSearch className='h-5 w-5 text-black' />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
            afterLeave={() => setFilter('')}
          >
            <Combobox.Options className='absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
              {filteredBikePoints?.length === 0 && filter !== '' ? (
                <div className='relative cursor-default select-none py-2 px-4 text-gray-700'>
                  Nothing found.
                </div>
              ) : (
                filteredBikePoints?.map((bike: BikePointType) => (
                  <Combobox.Option
                    key={bike.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-teal-600 text-white' : 'text-gray-900'
                      }`
                    }
                    value={bike}
                  >
                    <>
                      <span className='block truncate'>{bike.commonName}</span>
                    </>
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
