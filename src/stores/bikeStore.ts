import axios from 'axios';
import create from 'zustand';

export type BikePointType = {
  $type: string;
  additionalProperties: any[];
  children: any[];
  childrenUrls: any[];
  commonName: string;
  id: string;
  lat: number;
  lon: number;
  placeType: string;
  url: string;
};

type BikePointDetailType = {
  $type: string;
  id: string;
  name: string;
  bikesCount: number;
  emptyDocks: number;
  totalDocks: number;
  standardBikesCount: number;
  eBikesCount: number;
};

type LatLngLiteral = google.maps.LatLngLiteral;

interface MapState {
  centerPosition: LatLngLiteral;

  bikePointsInRadius: BikePointType[];
  selectedBikePoint: BikePointType | null;
  filteredBikePoints: BikePointType[];
  bikePointDetail: BikePointDetailType | null;

  setCenterPosition: (position: LatLngLiteral) => void;
  setBikePointsInRadius: (bikePoint: LatLngLiteral) => void;
  setSelectedBikePoint: (point: any) => void;
  setFilteredBikePoints: (filter: string | undefined) => void;
  setBikePointDetail: (id: string) => void;
}

const useBikeStore = create<MapState>((set) => ({
  centerPosition: { lat: 51.524868, lng: -0.099489 },
  bikePoints: [],
  filteredBikePoints: [],
  filter: '',
  bikePointsInRadius: [],
  selectedBikePoint: null,
  bikePointDetail: null,

  setCenterPosition: (position) => {
    set({ centerPosition: position });
  },
  setBikePointsInRadius: async (bikePoint: LatLngLiteral) => {
    const response = await axios(
      `https://api.tfl.gov.uk/Place/?Lat=${bikePoint.lat}&Lon=${bikePoint.lng}&radius=500&type=Bikepoint`
    );
    set({
      bikePointsInRadius: response.data.places,
    });
  },
  setSelectedBikePoint: (point) => {
    set({
      selectedBikePoint: point,
      centerPosition: { lat: point.lat, lng: point.lon },
    });
  },

  setFilteredBikePoints: async (filter: string | undefined) => {
    if (filter) {
      const response = await axios(
        `https://api.tfl.gov.uk/BikePoint/Search?query=${filter}`
      );
      set({ filteredBikePoints: response.data });
    }
  },
  setBikePointDetail: async (id: string) => {
    const response = await axios.get(
      `https://api.tfl.gov.uk/Occupancy/BikePoints/${id}`
    );
    set({ bikePointDetail: response.data[0] });
  },
}));

export default useBikeStore;
