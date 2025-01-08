"use client"

import React from "react"
import DataStatsOne from "@/components/DataStats/DataStatsOne"
import ChartOne from "@/components/Charts/ChartOne"
import ChartTwo from "@/components/Charts/ChartTwo"
import ChartThree from "@/components/Charts/ChartThree"
import DefaultLayout from "@/components/Layouts/DefaultLaout"
import TableOne from "@/components/Tables/TableOne"
import ChatCard from "@/components/Chat/ChatCard"

const Dashboard: React.FC = () => {
  return (
    <DefaultLayout>
      {/* Stats Section */}
      <div className="mb-6">
        <DataStatsOne />
      </div>

      {/* Charts Grid Section */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div className="col-span-1">
          <ChartOne />
        </div>
        <div className="col-span-1">
          <ChartTwo />
        </div>
        <div className="col-span-1">
          <ChartThree />
        </div>
      </div>

      {/* Table and Chat Section */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
        {/* Table Section */}
        <div className="xl:col-span-8">
          <TableOne />
        </div>
        {/* Chat Section */}
        <div className="xl:col-span-4">
          <ChatCard />
        </div>
      </div>
    </DefaultLayout>
  )
}

export default Dashboard
