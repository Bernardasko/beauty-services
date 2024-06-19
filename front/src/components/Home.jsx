import { Grid, CssBaseline, Button } from "@mui/material";
import beautyImage from "../images/beauty-salon.png";
import Cards from "./Cards";
import { useContext } from "react";
import { StateContext } from "../utils/StateContext";
import BeautyForms from "./BeautyForms";
import Modal from '@mui/joy/Modal';
import { getLogedInUser } from "../utils/auth/authenticate";


function Home() {
    const { open, setOpen, beauty, setBeauties, setUpdate, } = useContext(StateContext);
  
    const user = getLogedInUser();
    const isAdmin = user?.data.role === 'admin';
  
    console.log('beauties:', beauty);
  
    
    return (
      <>
        <CssBaseline />
        <Grid container component={"main"} sx={{ height: "93vh" }}>
          <Grid
            item
            xs={12}
            sx={{
              backgroundImage: `url(${beautyImage})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: { xs: "100vh" },
            }}
          >
            <Grid>
              {isAdmin && (
                <Button
                  sx={{ mt: 6, ml: 4, position: "absolute" }}
                  variant="contained"
                  onClick={() => setOpen(true)}
                >
                  Create a Beauty
                </Button>
              )}
              <h1 style={{ color: "white", textAlign: "center" }}>
                Welcome to Beauty Services
              </h1>
            </Grid>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              spacing={2}
              mt={10}
            >
              {beauty &&
                beauty.map((beauty) => (
                  <Grid item key={beauty._id}>
                    <Cards beauty={beauty} setUpdate={setUpdate} />
                  </Grid>
                ))}
            </Grid>
          </Grid>
        </Grid>
        <Modal open={open} onClose={() => setOpen(false)}>
          <div>
          <BeautyForms />
          </div>
        </Modal>
      </>
    );
  }
  
  export default Home;