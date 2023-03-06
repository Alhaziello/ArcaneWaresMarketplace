import { useList } from "@pankod/refine-core";
import { PieCharts, Referrals, Totals, ItemCard, TopSeller } from "components";
import { Typography, Box, Stack } from "@pankod/refine-mui";

const Home = () => {
  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#ffffff ">
        Website Stats
      </Typography>
      <Box mt="20px" display="flex" flexWrap="wrap" gap={4}>
        <PieCharts
          title="Items for Sale"
          value={684}
          series={[75, 25]}
          colors={["#073021", "#e6e8ef"]}
        />
        <PieCharts
          title="Total Users "
          value={222}
          series={[75, 25]}
          colors={["#073021", "#e6e8ef"]}
        />
      </Box>
      <Stack mt="25px" width="100%" direction={{ xs: "column", lg: "row" }} gap={4}>
        <Totals />
        <Referrals />
      </Stack>
    </Box>
  );
};

export default Home;
