import {
  Box,
  Typography,
  FormControl,
  FormHelperText,
  TextField,
  TextareaAutosize,
  Stack,
  Select,
  MenuItem,
  Button,
  width,
  ButtonGroup,
} from "@pankod/refine-mui";
import { info } from "console";
import { FormProps } from "interfaces/common";
import CustomButton from "./CustomButton";

const Form = ({
  type,
  register,
  handleSubmit,
  handleImageChange,
  formLoading,
  onFinishHandler,
  itemImage,
}: FormProps) => {
  return (
    <Box>
      <Typography fontSize={25} fontWeight={700}>
        {" "}
        {type} an Item{" "}
      </Typography>
      <Box mt={2.5} borderRadius="15px" padding="20px" bgcolor="#D5D6D0">
        <form
          style={{
            marginTop: "10px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
          onSubmit={handleSubmit(onFinishHandler)}
        >
          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 550,
                margin: "10px",
                fontSize: 16,
                color: "#013A20",
              }}
            >
              Enter your Item name
            </FormHelperText>

            <TextField
              fullWidth
              required
              id="outline-basic"
              variant="outlined"
              color="info"
              {...register("title", { required: true })}
            />
          </FormControl>

          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 550,
                margin: "10px",
                fontSize: 16,
                color: "#013A20",
              }}
            >
              Enter description
            </FormHelperText>
            <TextareaAutosize
              minRows={5}
              required
              placeholder="Write something about the item you want to sell"
              color="primary"
              style={{
                width: "100%",
                background: "transparent",
                fontSize: "16px",
                borderColor: "rgba(0,0,0,0.23)",
                borderRadius: 6,
                padding: 10,
                color: "#000000",
              }}
              {...register("description", { required: true })}
            />
          </FormControl>

          <Stack direction={"row"} gap={4}>
            <FormControl sx={{ flex: 1 }}>
              <FormHelperText
                sx={{
                  fontWeight: 550,
                  margin: "10px",
                  fontSize: 16,
                  color: "#013A20",
                }}
              >
                Select Item Type
              </FormHelperText>
              <Select
                variant="outlined"
                color="info"
                displayEmpty
                required
                inputProps={{ "aria-label": "Without label" }}
                defaultValue="Spell"
                {...register("itemType", { required: true })}
              >
                <MenuItem value="Spell"> Spell</MenuItem>
                <MenuItem value="Magic Item"> Magic Item</MenuItem>
                <MenuItem value="Talisman"> Talisman</MenuItem>
                <MenuItem value="Potion"> Potion</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <FormHelperText
                sx={{
                  fontWeight: 550,
                  margin: "10px",
                  fontSize: 16,
                  color: "#013A20",
                }}
              >
                Enter Item Price
              </FormHelperText>

              <TextField
                fullWidth
                required
                id="outline-basic"
                variant="outlined"
                color="info"
                type="number"
                {...register("price", { required: true })}
              />
            </FormControl>
          </Stack>
          <Stack direction={"column"} gap={1} justifyContent={"center"} mb={2}>
            <Stack direction={"row"} gap={2}>
              <Typography
                color="#013A20"
                fontSize={16}
                fontWeight={550}
                my="10px"
                margin={"10px"}
              >
                {" "}
                Item Photo{" "}
              </Typography>
              <Button
                component="label"
                sx={{
                  width: "fit-content",
                  color: "#2E5B46",
                  textTransform: "capitalize",
                  fontSize: 16,
                }}
              >
                Upload *
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={(e) => {
                    // @ts-ignore
                    handleImageChange(e.target.files[0]);
                  }}
                ></input>
              </Button>
            </Stack>
            <Typography
              fontSize={14}
              color={"2E5B46"}
              sx={{ wordBreak: "break-all" }}
            >
              {itemImage?.name}{" "}
            </Typography>
          </Stack>
          <CustomButton
            type="submit"
            title={formLoading ? "Submitting..." : "Submit"}
            backgroundColor={"#013A20"}
            color={"#ffffff"}
          />
        </form>
      </Box>
    </Box>
  );
};

export default Form;
