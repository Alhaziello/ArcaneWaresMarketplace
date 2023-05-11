import React from "react";
import ReactApexChart from "react-apexcharts";
import { Typography, Box, Stack } from "@pankod/refine-mui";
import { ArrowCircleUpRounded } from "@mui/icons-material";
import { TotalRevenueOptions } from "./chart.config";
import { TotalRevenueSeries } from "./chart.config";

const Totals = () => {
  return (
    <Box
      p={4}
      flex={1}
      bgcolor="#fcfcfc"
      id="chart"
      display="flex"
      flexDirection="column"
      borderRadius={"15px"}
    >
      <Typography fontSize={18} fontWeight={600} color="#051f20">
        Total Revenue
      </Typography>
      <Stack my="20px" direction="row" gap={4} flexWrap="wrap">
        <Typography fontSize={28} fontWeight={700} color="#051f20">
          $263,555
        </Typography>
        <Stack direction={"row"} alignItems="center" gap={1}>
          <ArrowCircleUpRounded sx={{ fontSize: 25, color: "#073021" }} />
          <Stack>
            <Typography fontSize={12} color="#073021">
              0.8%
            </Typography>
            <Typography fontSize={12} color="#073021">
              Than Last Quarter
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <ReactApexChart
        series={TotalRevenueSeries}
        type={"bar"}
        height={350}
        options={TotalRevenueOptions}
      />
    </Box>
  );
};

export default Totals;
