"use client";
import MyChart from "@/components/MyChart";
import MyChartSum from "@/components/MyChartSum";

export default function Page() {
  return (
    <div className='w-full'>
      <h1>Pets' Chart</h1>
      <div className='flex w-full space-x-4'>
        <div className='flex-1'>
          <MyChart />
        </div>
        <div className='flex-1'>
          <MyChartSum />
        </div>
      </div>
    </div>
  );
}
