import { Link } from "@pankod/refine-react-router-v6";
import {
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  Stack,
} from "@pankod/refine-mui";
import { ItemCardProps } from "interfaces/item";

const ItemCard = ({ id, title, price, photo }: ItemCardProps) => {
  return (
    <Card
      component={Link}
      to={`/items/show/${id}`}
      sx={{
        maxWidth: "330px",
        padding: "10px",
        textDecoration:'none',
        "&hover": {
          boxShadow: "0 22px 45px 2px rgba(176,176,176,0.1)",
        },
        cursor: "pointer",
      }}
      elevation={0}
    
    >
      <CardMedia
        component={"img"}
        width="100%"
        height={210}
        image={photo}
        alt="card pic"
        sx={{ borderRadius: "15px" }}
      />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: "10px",
          paddingX: "5px",
        }}
      >
        <Stack direction={"column"}>
          <Typography fontSize={16} fontWeight={550} > {title}</Typography>
        </Stack>
        <Box  px={1.5} py={0.5} borderRadius={1} height={'fit-content'} bgcolor={'#013a20'} >
          <Typography fontSize={12} fontWeight={550}  >${price}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ItemCard;
