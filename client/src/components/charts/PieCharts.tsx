import React from "react";
import ReactApexChart from "react-apexcharts";
import { Typography, Box, Stack } from "@pankod/refine-mui";
import { PieChartProps } from "interfaces/home";

const PieCharts = ({ title, value, series, colors }: PieChartProps) => {
  return (
    <Box
      id="chart"
      flex={1}
      display="flex"
      bgcolor="#ffffff"
      flexDirection="row"
      alignItems="center"
      pl={3.5}
      py={2}
      gap={2}
      borderRadius={4}
      minHeight="110px"
      width="fit-content"
    >
      <Stack direction="column">
        <Typography fontSize={14} color="#051f20">
          {""}
          {title}
        </Typography>
        <Typography fontSize={26} color="#051f20" fontWeight={700}>
          {" "}
          {value}
        </Typography>
      </Stack>
      <ReactApexChart
        options={{
          chart: { type: "donut" },
          colors,
          legend: { show: false },
          dataLabels: { enabled: false },
        }}
        series={series}
        type="donut"
        width="110px"
      />
    </Box>
  );
};

export default PieCharts;
