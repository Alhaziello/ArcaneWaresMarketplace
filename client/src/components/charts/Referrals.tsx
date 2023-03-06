import React from "react";
import { Typography, Box, Stack } from "@pankod/refine-mui";
import { percentageOfSales } from "constants/index";

interface ProgressBarProps {
  title: string;
  percentage: number;
  color: string;
}
const ProgressBar = ({ title, percentage, color }: ProgressBarProps) => (
  <Box width="100%">
    <Stack
      direction={"row"}
      alignItems="center"
      justifyContent={"space-between"}
    >
      <Typography fontSize={"15"} fontWeight={500} color={"#051f20"}>
        {title}
      </Typography>
      <Typography fontSize={"15"} fontWeight={500} color={"#051f20"}>
        {percentage}%
      </Typography>
    </Stack>
    <Box
      mt={2}
      position="relative"
      width="100%"
      height="8px"
      borderRadius={1}
      bgcolor="#e4e8ef"
    >
      <Box
        width={`${percentage}%`}
        bgcolor={color}
        position="absolute"
        height="100%"
        borderRadius={1}
      />
    </Box>
  </Box>
);

const Referrals = () => {
  return (
    <Box
      p={4}
      bgcolor="#fcfcfc"
      id="chart"
      minWidth={400}
      display="flex"
      flexDirection="column"
      borderRadius={"15px"}
    >
      <Typography fontSize={18} fontWeight={600} color="#051f20">
        Articles sold: 
      </Typography>
      <Stack my={"20px"} direction="column" gap={4}>
        {percentageOfSales.map((bar) => (
          <ProgressBar key={bar.title} {...bar} />
        ))}
      </Stack>
    </Box>
  );
};

export default Referrals;
