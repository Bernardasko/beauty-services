import { useContext } from "react";
import { StateContext } from "../utils/StateContext";
import AllMyCards from "../components/AllMyCards";
import { Grid, Container } from '@mui/material';
import { getLogedInUser } from "../utils/auth/authenticate";


function AllBeautyList() {
  const { users } = useContext(StateContext);

  const loggedInUser = getLogedInUser();

  const currentUser = users.find(user => user._id === loggedInUser?.data._id);
  

  return (
    <Container>
      <Grid container spacing={2}>
        {currentUser && currentUser.beauties.map((beauty) => (
          <Grid item key={beauty._id} xs={12} sm={6} md={4}>
            <AllMyCards beauty={beauty} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default AllBeautyList;