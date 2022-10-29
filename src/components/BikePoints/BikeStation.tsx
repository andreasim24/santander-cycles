import BikeStationDetail from '@/components/BikePoints/BikeStationDetail';
import SearchBar from '@/components/BikePoints/SearchBar';
import Map from '@/components/Map';

import useBikeStore from '@/stores/bikeStore';

export default function BikePoints() {
  const selectedBikePoint = useBikeStore((state) => state.selectedBikePoint);

  return (
    <div className='mx-auto mt-12  w-full space-y-12 p-6 md:px-20  xl:px-32'>
      <h1 className='text-center'>Find your nearest bike station</h1>
      <div className='flex w-full flex-col space-y-10 text-white md:space-y-0 xl:max-h-[725px] xl:flex-row'>
        <div className='flex flex-col xl:w-4/12'>
          <SearchBar />
          {selectedBikePoint ? (
            <BikeStationDetail />
          ) : (
            <div className='flex h-full items-center justify-center bg-white p-6 text-center text-black'>
              Search for bike stations by their name, street or nearby
              landmarks.
            </div>
          )}
        </div>

        <div className='xl:w-8/12'>
          <Map />
        </div>
      </div>
    </div>
  );
}
