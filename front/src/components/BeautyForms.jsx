import { useState, useContext } from "react";
import { StateContext } from "../utils/StateContext";
import {
  Box,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useForm, Controller } from "react-hook-form";
import { postData } from "../services/post";
import { styled } from "@mui/material/styles";
import dayjs from "dayjs";
import { ModalClose, Sheet } from "@mui/joy";

function TourForms() {
  const { setUpdate, setOpen, categories } = useContext(StateContext);
  const [selectedDates, setSelectedDates] = useState([]);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      photo: "",
      duration: "",
      dates: "",
      price: "",
      description: "",
      category: "",
    },
  });

  const handleAddDate = (date) => {
    setSelectedDates((prevDates) => [...prevDates, date]);
  };

  const handleRemoveDate = (index) => {
    setSelectedDates((prevDates) => prevDates.filter((_, i) => i !== index));
  };

  const formSubmitHandler = async (data) => {
    data.dates = selectedDates.map((date) => dayjs(date).format("MM/DD/YYYY"));
    try {
      await postData({ ...data, photo: data.photo[0] });
      setUpdate((update) => update + 1);
      setOpen(false);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        component="form"
        onSubmit={handleSubmit(formSubmitHandler)}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          maxWidth: 500,
          mx: "auto",
          mt: 3,
          height: "90vh",
          overflowY: "auto",
        }}
      >
        <Sheet
          variant="outlined"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography variant="h4" component="h1" gutterBottom>
            Create a New Beauty
          </Typography>
          <TextField
            label="Title"
            name="title"
            id="title"
            autoComplete="title"
            {...register("title", { required: true })}
            error={!!errors.title}
            helperText={errors.title?.message}
          />
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload file
            <VisuallyHiddenInput
              name="photo"
              type="file"
              {...register("photo")}
            />
          </Button>
          <TextField
            label="Duration hours"
            name="duration"
            type="number"
            id="duration"
            autoComplete="duration"
            {...register("duration", { required: true })}
            error={!!errors.duration}
            helperText={errors.duration?.message}
          />
          <Controller
            name="datePicker"
            control={control}
            render={({ field }) => (
              <DatePicker
                label="Select Date"
                value={field.value}
                onChange={(date) => handleAddDate(date)}
                renderInput={(params) => <TextField {...params} />}
              />
            )}
          />
          <ul>
            {selectedDates.map((date, index) => (
              <li key={index}>
                {dayjs(date).format("MM/DD/YYYY")}
                <Button onClick={() => handleRemoveDate(index)}>Remove</Button>
              </li>
            ))}
          </ul>
          <TextField
            label="Price"
            name="price"
            type="number"
            id="price"
            autoComplete="price"
            {...register("price", { required: true })}
            error={!!errors.price}
            helperText={errors.price?.message}
          />
          <TextField
            label="description"
            name="description"
            id="description"
            autoComplete="description"
            {...register("description", { required: true })}
            error={!!errors.description}
            helperText={errors.description?.message}
            multiline
            rows={4}
          />
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                displayEmpty
                fullWidth
                onChange={(e) => field.onChange(e.target.value)}
              >
                <MenuItem value="" disabled>
                  Select Category
                </MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category._id} value={category._id}>
                    {category.title}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Sheet>
      </Box>
    </LocalizationProvider>
  );
}

export default TourForms;
