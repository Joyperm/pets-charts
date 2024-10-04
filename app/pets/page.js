"use client";
import MyChart from "@/components/MyChart";
import MyChartSum from "@/components/MyChartSum";

export default function Page() {
  return (
    <div>
      <h1>Pets' Chart</h1>
      <MyChart />
      <MyChartSum />
    </div>
  );
}
