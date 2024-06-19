import { useState, useEffect, useContext } from "react";
import { updateData } from "../services/update";
import {
  Box, Button, TextField, Typography, Select, MenuItem, IconButton,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { ModalClose, Sheet } from '@mui/joy';
import { useForm, Controller } from "react-hook-form";
import { StateContext } from "../utils/StateContext";
import dayjs from "dayjs";
import { styled } from "@mui/material/styles";

function EditBeautyInfo({ beauty }) {
  const { setUpdate, setOpen, categories } = useContext(StateContext);
  const [selectedDates, setSelectedDates] = useState([]);

  const { register, handleSubmit, setValue, reset, control,
    formState: { errors } } = useForm({
    defaultValues: {
      title: "",
      photo: "",
      duration: "",
      dates: [],
      price: "",
      comment: "",
      category: "",
    }
  });

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

  const formSubmitHandler = async (data) => {
    data.dates = selectedDates.map((date) => dayjs(date).format("MM/DD/YYYY"));
    try {
      await updateData(beauty._id, { ...data, photo: data.photo[0] });
      setUpdate((update) => update + 1);
      setOpen(false);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (beauty) {
      setValue("title", beauty.title);
      setValue("duration", beauty.duration);
      setSelectedDates(beauty.dates.map(date => dayjs(date, "MM/DD/YYYY").toDate()));
      setValue("price", beauty.price);
      setValue("description", beauty.description);
      setValue("category", beauty.category);
    }
  }, [beauty, setValue]);

  const handleAddDate = () => {
    setSelectedDates((prevDates) => [...prevDates, null]);
  };

  const handleDateChange = (index, date) => {
    const newDates = [...selectedDates];
    newDates[index] = date;
    setSelectedDates(newDates);
  };

  const handleRemoveDate = (index) => {
    setSelectedDates((prevDates) => prevDates.filter((_, i) => i !== index));
  };

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
          height: '90vh',
          overflowY: "auto",
          mx: "auto",
          mt: 3,
        }}
      >
        <Sheet
          variant="outlined"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography variant="h4" component="h1" gutterBottom>
            Edit Beauty
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
          {selectedDates.map((date, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Controller
                control={control}
                name={`dates[${index}]`}
                render={({ field }) => (
                  <DatePicker
                    label={`Date ${index + 1}`}
                    value={date}
                    onChange={(newValue) => handleDateChange(index, newValue)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                )}
              />
              <IconButton onClick={() => handleRemoveDate(index)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
          <Button onClick={handleAddDate} startIcon={<AddIcon />} variant="outlined">
            Add Date
          </Button>
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

export default EditBeautyInfo;
