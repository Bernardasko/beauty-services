import { Grid, CssBaseline, Button } from "@mui/material";
import Beauty from "../images/beauty-salon.png";
import AllMyCards from "./AllMyCards";
import { useContext } from "react";
import { StateContext } from "../utils/StateContext";
import BeautyForms from "./BeautyForms";
import Modal from '@mui/joy/Modal';
import { getLogedInUser } from "../utils/auth/authenticate";

function AllMyBeauty() {
    const { open, setOpen, users } = useContext(StateContext);

    const loggedInUser = getLogedInUser();
    const isAdmin = loggedInUser?.data.role === 'admin';

    // useEffect(() => {
    //     console.log(users);
    // }, [users]);

    const currentUser = users.find(user => user._id === loggedInUser?.data._id);

    return (
        <>
            <CssBaseline />
            <Grid container component={"main"} sx={{ height: "93vh" }}>
                <Grid
                    item
                    xs={12}
                    sx={{
                        backgroundImage: `url(${Beauty})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        height: { xs: "93.9vh", sm: "auto" },
                    }}
                >
                    <Grid>
                        {isAdmin && (
                            <Button
                                sx={{ mt: 6, ml: 4, position: "absolute" }}
                                variant="contained"
                                onClick={() => setOpen(true)}
                            >
                                Create a salon
                            </Button>
                        )}
                        <h1 style={{ color: "white", textAlign: "center" }}>
                            Your Beauty Services
                        </h1>
                    </Grid>
                    <Grid
                        container
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                        mt={10}
                    >
                        {currentUser && currentUser.beauty.map((beauty) => (
                            <Grid item key={beauty._id}>
                                <AllMyCards beauty={beauty} />
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

export default AllMyBeauty;
