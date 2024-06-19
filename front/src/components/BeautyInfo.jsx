import { useState, useEffect, useContext } from "react";
import { StateContext } from "../utils/StateContext";
import { useParams } from "react-router-dom";
import { Container, Grid, Typography, Card, CardMedia, CardContent, Box, Button, CssBaseline, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Select, MenuItem } from '@mui/material';
import { Textarea } from "@mui/joy";
import Modal from "@mui/joy/Modal";
import { deleteData } from "../services/delete";
import { useNavigate } from "react-router-dom";
import EditBeautyInfo from "./EditBeautyInfo";
import beautySalons2 from "../images/beauty-salon2.jpg";
import { getLogedInUser } from "../utils/auth/authenticate";
import { Link } from "react-router-dom";
import { postMyData } from "../services/post";
// import CommentRatingDisplay from "./CommentRatingCards";


function BeautyInfo() {
  const [allBeauties, setAllBeauties] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedDates, setSelectedDates] = useState("");
  const { beauty, setBeauty, categories, setUpdate, open, setOpen, users } = useContext(StateContext);
  const { id } = useParams();
  const  fbeauty = allBeauties.find((beauty) => beauty._id === id);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteData(id);
      setUpdate((update) => update + 1);
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setOpenDeleteDialog(false);
    }
  };

  const handleMyBeauty = async () => {
    try {
      const response = await postMyData(id, { date: selectedDates });
      console.log(response);
      setUpdate((update) => update + 1);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setAllBeauties(beauty);
  }, [beauty]);

  const getCategoryTitle = (categoryId) => {
    const category = categories.find((cat) => cat._id === categoryId);
    return category ? category.title : "Unknown Category";
  };

  const user = getLogedInUser();
  const isAdmin = user?.data.role === 'admin';

  return (
    <>
      <CssBaseline />
      {fbeauty && (
        <Box
          style={{
            backgroundImage: `url(${beautySalons2})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            padding: '20px 0',
            height: '100%',
          }}
        >
          <Container style={{ maxWidth: '940px', marginTop: 20, padding: 0 }}>
            <Card>
              <Grid container>
                <Grid item xs={12} md={6}>
                  <CardMedia
                    component="img"
                    image={fbeauty.photo}
                    alt="Photo"
                    style={{ height: '100%', width: '100%' }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CardContent>
                    <Box sx={{ padding: 2 }}>
                      <Typography variant="h4" component="div" gutterBottom>
                        Salon Information
                      </Typography>
                      <Typography variant="body1" component="div" gutterBottom>
                        <strong>Duration:</strong> {fbeauty.duration} days
                      </Typography>
                      <Typography variant="body1" component="div" gutterBottom>
                        <strong>Dates:</strong>
                      </Typography>
                      <Select
                        displayEmpty
                        fullWidth
                        value={selectedDates}
                        onChange={(e) => setSelectedDates(e.target.value)}
                        renderValue={() => selectedDates || 'Select Date'}
                      >
                        {fbeauty.dates.map((date, index) => (
                          <MenuItem key={index} value={date}>
                            {date}
                          </MenuItem>
                        ))}
                      </Select>
                      <Typography variant="body1" component="div" gutterBottom>
                        <strong>Price:</strong> ${fbeauty.price}
                      </Typography>
                      <Typography variant="body1" component="div" gutterBottom>
                        <strong>Description:</strong>
                      </Typography>
                      <Textarea
                        aria-label="Salon comment"
                        minRows={3}
                        maxRows={10}
                        fontFamily="Arial, sans-serif"
                        placeholder="Add your comments here"
                        style={{ width: '100%', marginTop: '8px', padding: '8px' }}
                        value={fbeauty.description}
                      />
                      <Typography variant="body1" component="div" gutterBottom>
                        <strong>Category:</strong> {getCategoryTitle(fbeauty.category)}
                      </Typography>
                      {isAdmin && (
                        <Box sx={{ marginTop: 2 }}>
                          <Button variant="contained" color="primary" onClick={() => setOpen(true)} style={{ marginRight: 10 }}>
                            Edit
                          </Button>
                          <Button variant="contained" color="secondary" onClick={() => setOpenDeleteDialog(true)}>
                            Delete
                          </Button>
                        </Box>
                      )}
                      {!isAdmin && (
                        <Typography>
                          <strong>
                            If you want to participate in this salon, please <Link to="/login">log in</Link>.<br />
                            If you want to book a salon, please select dates<Link to="/"><Button onClick={handleMyBeauty} variant="contained">Order</Button></Link>
                          </strong>
                        </Typography>
                      )}
                    </Box>
                  </CardContent>
                </Grid>
              </Grid>
            </Card>
          </Container>
          <div style={ {display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: "20px",  }}>
          {/* <CommentRatingDisplay  users={users} /> */}
          </div>
        </Box>
      )}
      <Modal open={open} onClose={() => setOpen(false)}>
        <div>
          <EditBeautyInfo beauty={fbeauty} setUpdate={setUpdate} />
        </div>
      </Modal>
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this salon?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default BeautyInfo;
