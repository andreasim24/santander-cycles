import React, { useEffect } from "react";
import { MdDirectionsBike, MdSafetyDivider } from "react-icons/md";

import useBikeStore from "@/stores/bikeStore";
import Button from "../buttons/Button";

export default function BikePoint() {
  const bikePointDetail = useBikeStore(state => state.bikePointDetail);
  const selectedBikePoint = useBikeStore(state => state.selectedBikePoint);
  const setBikePointDetail = useBikeStore(state => state.setBikePointDetail);

  useEffect(() => {
    if (selectedBikePoint) {
      setBikePointDetail(selectedBikePoint?.id);
    }
  }, [selectedBikePoint, setBikePointDetail]);

  return (
    <div className="flex flex-col justify-between bg-white pb-4">
      <div className="divide-y-2  text-black">
        <div className="p-4">
          <h3>{bikePointDetail?.name}</h3>
        </div>
        <div className="flex flex-col space-x-2 divide-y-2 p-4 ">
          <div className="flex flex-col items-center rounded-lg p-2">
            <MdDirectionsBike className="text-4xl" />
          </div>
          <div className="flex flex-row items-center justify-between p-1">
            <h5>Total Bikes</h5>
            <h3 className="font-bold ">{bikePointDetail?.bikesCount}</h3>
          </div>

          <div className="flex flex-row items-center justify-between p-1">
            <h5>Standard Bikes</h5>
            <h3 className="font-bold ">
              {bikePointDetail?.standardBikesCount}
            </h3>
          </div>

          <div className="flex flex-row items-center justify-between p-1">
            <h5>E-Bikes</h5>
            <h3 className="font-bold ">{bikePointDetail?.eBikesCount}</h3>
          </div>
        </div>
        <div className="flex flex-col space-x-2 divide-y-2 p-4">
          <div className="flex flex-col items-center rounded-lg p-2">
            <MdSafetyDivider className="text-4xl" />
          </div>
          <div className="flex flex-row items-center justify-between p-1">
            <h5>Empty Docks</h5>
            <h3 className="font-bold ">{bikePointDetail?.emptyDocks}</h3>
          </div>
          <div className="flex flex-row items-center justify-between p-1">
            <h5>Total Docks</h5>
            <h3 className="font-bold ">{bikePointDetail?.totalDocks}</h3>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-x-2 divide-y-2 p-4">
        <Button variant="primary" className="flex justify-center">
          <a
            href={`https://www.google.com/maps?q=${selectedBikePoint?.commonName}`}
            target="_blank"
            rel="noreferrer"
          >
            View on Google Maps
          </a>
        </Button>
      </div>
    </div>
  );
}
