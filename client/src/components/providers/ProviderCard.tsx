import React from "react";
import { ProviderCardProp, InfoBarProps } from "interfaces/provider";
import { useGetIdentity } from "@pankod/refine-core";
import { Box, Stack, Typography } from "@pankod/refine-mui";
import { Link } from "@pankod/refine-react-router-v6";
import { EmailOutlined } from "@mui/icons-material";

const InfoBar = ({ icon, name }: InfoBarProps) => (
  <Stack flex={1} minWidth={{ xs: "100%", sm: 300 }} gap={1.5} direction="row">
    {icon}
    <Typography fontSize={14} color="#ffffff">
      {name}
    </Typography>
  </Stack>
);
const ProviderCard = ({ id, name, email, avatar }: ProviderCardProp) => {
  const { data: currentUser } = useGetIdentity();
  const generateLink = () => {
    if (currentUser.email === email) return "/my-profile";
    return `/providers/show/${id}`;
  };
  return (
    <Box
      component={Link}
      to={generateLink()}
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: "30px",
        padding: "30px",
        color:'#ffffff',
        "&:hover": {
          boxShadow: "0 22px 45px 2px rgba(176,176,176,0.1)",
        },
      }}
    >
      <img
        src={avatar}
        alt="user"
        width={90}
        height={90}
        style={{ borderRadius: 8, objectFit: "cover" }}
      />
      <Stack
        direction={"column"}
        justifyContent="space-between"
        flex={1}
        gap={{ xs: 4, sm: 2 }}
      >
        <Stack gap={2} direction="row" flexWrap={"wrap"} alignItems="center">
          <Typography fontSize={22} fontWeight={600}>
            {name}
          </Typography>
          <Typography fontSize={14}> Magic Items Smuggler </Typography>
        </Stack>
        <Stack
          direction="row"
          flexWrap="wrap"
          justifyContent="space-between"
          alignItems="center"
          gap={2}
        >
          <InfoBar
            icon={<EmailOutlined sx={{ color: "#013a20" }} />}
            name={email}
          />
        </Stack>
      </Stack>
    </Box>
  );
};

export default ProviderCard;
