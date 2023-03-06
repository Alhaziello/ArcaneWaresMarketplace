import { Add } from "@mui/icons-material";
import { useTable } from "@pankod/refine-core";
import {
  Box,
  Stack,
  TextField,
  Typography,
  Select,
  MenuItem,
  Menu,
} from "@pankod/refine-mui";
import { useNavigate } from "@pankod/refine-react-router-v6";

import { CustomButton, ItemCard } from "components";
import { useMemo } from "react";

const AllItems = () => {
  const navigate = useNavigate();
  const {
    tableQueryResult: { data, isLoading, isError },
    current,
    setCurrent,
    setPageSize,
    pageCount,
    sorter,
    setSorter,
    filters,
    setFilters,
  } = useTable();

  // useTable hook will read the URL from refine resources in APP.TSX. After that , whatever is on the list property will be displayed.
  // testing what data we receive
  console.log(data);

  const allItems = data?.data ?? [];

  // currentPrice sort? we need .find in sorter array for an object with the field property equal to price
  //
  const currentPrice = sorter.find((item) => item.field === "price")?.order;
  // toggles the current price sorter to ascending and descending taking in the string field from current price

  const toggleSort = (field: string) => {
    setSorter([{ field, order: currentPrice === "asc" ? "desc" : "asc" }]);
  };

  const currentFilterValues = useMemo(() => {
    const logicalFilters = filters.flatMap((item) =>
      "field" in item ? item : []
    );

    return {
      title: logicalFilters.find((item) => item.field === "title")?.value || "",
      itemType:
        logicalFilters.find((item) => item.field === "itemType")?.value || "",
    };
  }, [filters]);

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error...</Typography>;

  return (
    <Box>
      <Box mt={"20"} sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        <Stack direction={"column"} width="100%">
          <Typography fontSize={25} fontWeight={700} color="#ffffff">
            {!allItems.length ? "There are no items" : "All items"}
          </Typography>
          <Box
            mb={2}
            mt={3}
            display="flex"
            width="90%"
            justifyContent={"space-between"}
            flexWrap="wrap"
          >
            {" "}
            <Box
              display="flex"
              gap={2}
              flexWrap="wrap"
              mb={{ xs: "20px", sm: 0 }}
            >
              {" "}
              <CustomButton
                title={`Sort Price ${currentPrice === "asc" ? "↑" : "↓"}`}
                handleClick={() => toggleSort("price")}
                backgroundColor="#013a20"
                color="#ffffff"
              />
              <TextField
                variant="outlined"
                color="info"
                placeholder="Search by name"
                value={currentFilterValues.title}
                onChange={(e) => {
                  setFilters([
                    {
                      field: "title",
                      operator: "contains",
                      value: e.currentTarget.value
                        ? e.currentTarget.value
                        : undefined,
                    },
                  ]);
                }}
              />
              <Select
                variant="outlined"
                color="info"
                displayEmpty
                required
                inputProps={{ "aria-label": "Without label" }}
                defaultValue=""
                value={currentFilterValues.itemType}
                onChange={(e) => {
                  setFilters(
                    [
                      {
                        field: "itemType",
                        operator: "eq",
                        value: e.target.value,
                      },
                    ],
                    "replace"
                  );
                }}
              >
                <MenuItem value="">All</MenuItem>
                {["Spell", "Magic Item", "Talisman", "Potion"].map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Box>
        </Stack>
      </Box>

      <Stack
        direction={"row"}
        justifyContent="space-between"
        alignItems={"center"}
      >
        <CustomButton
          title="Add Item"
          handleClick={() => navigate("/items/create")}
          backgroundColor="#013A20"
          icon={<Add />}
          color="#ffffff"
        />
      </Stack>
      <Box mt="20px" sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        {allItems.map((item) => (
          <ItemCard
            key={item._id}
            id={item._id}
            price={item.price}
            photo={item.photo}
            title={item.title}
          />
        ))}
      </Box>
      {allItems.length > 0 && (
        <Box display={"flex"} gap={2} mt={3} flexWrap="wrap">
          <CustomButton
            title="Previous Page"
            handleClick={() => setCurrent((prev) => prev - 1)}
            backgroundColor="#013a20"
            color="#ffffff"
            disabled={!(current > 1)}
          />{" "}
          <Box
            display={{ xs: "hidden", sm: "flex" }}
            alignItems="center"
            gap={5}
          >
            {" "}
            Page {current} of {pageCount}{" "}
          </Box>
          <CustomButton
            title="Next Page"
            handleClick={() => setCurrent((prev) => prev + 1)}
            backgroundColor="#013a20"
            color="#ffffff"
            disabled={current === pageCount}
          />{" "}
          <Select
            variant="outlined"
            color="info"
            displayEmpty
            required
            inputProps={{ "aria-label": "Without label" }}
            defaultValue={"10"}
            onChange={(e) =>
              setPageSize(e.target.value ? Number(e.target.value) : 10)
            }
          >
            {/* // map over an array of items, page sizes, return a MenuItem, add a
            //key of size and value //of size for iteration */}
            {[2,10, 20, 30, 40].map((size) => (
              <MenuItem key={size} value={size}>
                {" "}
                Show {size}{" "}
              </MenuItem>
            ))}
            <MenuItem value=""> All</MenuItem>
          </Select>
        </Box>
      )}
    </Box>
  );
};

export default AllItems;
