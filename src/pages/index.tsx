import * as React from "react";
import BikeStation from "@/components/BikePoints/BikeStation";
import Santander from "@/components/BikePoints/Santander";
import Layout from "@/components/layout/Layout";
import UnderlineLink from "@/components/links/UnderlineLink";
import Head from "next/head";

// type CurrentForecast = {
//   $id: string;
//   $type: string;
//   forecastBand: string;
//   forecastSummary: string;
//   forecastText: string;
//   forecastType: string;
//   n02Band: string;
//   o3Band: string;
//   pM10Band: string;
//   pM25Band: string;
//   sO2Band: string;
// };

// type CurrentForecastType = {
//   [key: number]: CurrentForecast;
// };

// interface AirQualityProps {
//   $id: string;
//   $type: string;
//   currentForecast: CurrentForecast[];
//   disclaimerText: string;
//   forecastURL: string;
//   updateFrequency: string;
//   updatePeriod: string;
// }

export default function HomePage() {
  return (
    <Layout>
      <Head>
        <title>Santander Cycles</title>
        <meta name="find nearest bike station" content="Santander Cycles" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="snap-y snap-always scroll-smooth">
        <section>
          <div className="bg-bike-2 flex h-[700px] w-full items-center justify-center bg-cover bg-center">
            <h1 className="max-w-xl md:max-w-2xl px-2 text-center text-6xl text-white md:px-0">
              Explore London with Santander Cycles
            </h1>
          </div>
        </section>
        <section className="flex snap-start flex-col bg-slate-100 p-6 text-black md:px-20 xl:px-32 ">
          <Santander />
        </section>
        <section className="flex snap-start flex-col items-center justify-center bg-slate-100 pb-24 text-black">
          <BikeStation />
        </section>

        <footer className="bg-slate-200 p-6 text-center">
          © {new Date().getFullYear()} By{" "}
          <UnderlineLink href="https://github.com/andreasim24">
            Andreas
          </UnderlineLink>
        </footer>
      </main>
    </Layout>
  );
}
