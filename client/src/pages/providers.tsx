import { useList } from "@pankod/refine-core";
import { Box, Typography } from "@pankod/refine-mui";

import { ProviderCard } from "components";

const Providers = () => {
  const { data, isLoading, isError } = useList({
    resource: "users",
  });
  const allProviders = data?.data ?? [];
  if (isLoading) return <div> loading...</div>;
  if (isError) return <div> Error...</div>;

  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#ffffff">
      Providers List
      </Typography>

      <Box
        mt="40px"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "30px",
          backgroundColor: "#292929",
        }}
      >
        {allProviders.map((provider) => (
          <ProviderCard
            key={provider._id}
            id={provider._id}
            name={provider.name}
            email={provider.email}
            avatar={provider.avatar}
          />
        ))}
      </Box>
    </Box>
  );
};
export default Providers;
