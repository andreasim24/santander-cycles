import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import * as React from "react";
import useDebounce from "@/hooks/useDebounce";
import useBikeStore from "@/stores/bikeStore";
import { ImSpinner2 } from "react-icons/im";

export default function Map() {
  const centerPosition = useBikeStore(state => state.centerPosition);
  const bikePointsInRadius = useBikeStore(state => state.bikePointsInRadius);
  const setBikePointsInRadius = useBikeStore(
    state => state.setBikePointsInRadius
  );
  const selectedBikePoint = useBikeStore(state => state.selectedBikePoint);
  const setSelectedBikePoint = useBikeStore(
    state => state.setSelectedBikePoint
  );

  const [localCenter, setLocalCenter] =
    React.useState<google.maps.LatLngLiteral>();
  const debouncedCenterPosition = useDebounce(localCenter, 200);

  const mapRef = React.useRef<any>();
  const mapOptions = React.useMemo(
    () => ({
      mapId: "eb548ed640da3909",
      clickableIcons: false
    }),
    []
  );
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    mapIds: ["eb548ed640da3909"]
  });
  const onLoad = React.useCallback((map: any) => (mapRef.current = map), []);

  const handleCenterChanged = () => {
    if (mapRef.current?.center?.lat && mapRef.current?.center?.lng()) {
      setLocalCenter({
        lat: mapRef.current?.center.lat(),
        lng: mapRef.current?.center.lng()
      });
    }
  };

  /* Panning the map to the selected bike point. */
  React.useEffect(() => {
    if (selectedBikePoint) {
      mapRef.current?.panTo({
        lat: selectedBikePoint.lat,
        lng: selectedBikePoint.lon
      });
    }
  }, [selectedBikePoint]);

  React.useEffect(() => {
    if (debouncedCenterPosition) {
      setBikePointsInRadius(debouncedCenterPosition);
    }
  }, [debouncedCenterPosition, setBikePointsInRadius]);

  if (!isLoaded) return <ImSpinner2 className="animate-spin" />;

  return (
    <>
      <GoogleMap
        zoom={16}
        center={centerPosition}
        mapContainerClassName="w-full h-full min-h-[500px] z-1"
        onLoad={onLoad}
        options={mapOptions}
        onCenterChanged={handleCenterChanged}
      >
        {bikePointsInRadius.map(point => (
          <Marker
            key={point.id}
            position={{
              lat: point.lat,
              lng: point.lon
            }}
            onClick={() => setSelectedBikePoint(point)}
          />
        ))}
      </GoogleMap>
      <p className="bg-green-900 p-2 text-white  xl:flex xl:items-center xl:justify-center">
        This will show you the nearest bike station within a 500m radius in the
        center of the map or the currently selected bike station.
      </p>
    </>
  );
}
