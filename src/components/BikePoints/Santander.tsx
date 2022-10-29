import Image from "next/image";
import SantanderBike from "~/images/santander.jpg";

export default function Santander() {
  return (
    <div className="mx-auto w-full">
      <div className="flex w-full flex-row items-start py-12 xl:space-x-24 xl:py-24 2xl:space-x-32">
        <div className="hidden h-[550px] w-[650px] object-cover transition-all duration-300 hover:scale-105 xl:flex">
          <Image
            src={SantanderBike}
            alt="Icon"
            className="w-full object-cover"
          />
        </div>

        <div className="flex flex-col space-y-6 xl:max-w-2xl 2xl:max-w-4xl">
          <div className="space-y-4 xl:space-y-0">
            <h1>Santander Cycles</h1>
            <div className="flex h-[350px] w-full object-cover xl:hidden">
              <Image
                src={SantanderBike}
                alt="Icon"
                className="w-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-6 ">
            <h3 className="font-light">
              London's public bike-sharing scheme, Santander Cycles, is
              available 24/7, 365 days a year.
            </h3>
            <h3 className="font-light">
              Santander Cycles has{" "}
              <b className="text-red-900">800 docking stations</b> and{" "}
              <b className="text-red-900">12,000 bikes</b> in circulation across
              London to help you get around quickly and easily. The bike hire
              scheme covers many popular areas of London, including the City,
              Westminster, Soho, Camden Town and more.
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
