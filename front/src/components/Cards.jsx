import { Card, CardContent, CardActions, CardMedia, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom'; 

export default function Cards({ beauty }) {
  return (
    <Card sx={{ width: 300, minHeight: 330 }}>
      <CardMedia
        sx={{height: 170 }}
        image={beauty.photo} 
        title={beauty.title} 
      />
      <CardContent sx={{ textAlign: "center", padding: 1, marginBottom: 3 }}>
        <Typography gutterBottom textAlign={"center"} variant="h5"  component="div">
          {beauty.title} 
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "center" }}>
        <Link to = {`/beauties/${beauty._id}`}>
        <Button size="large">More</Button>
        </Link>
      </CardActions>
    </Card>
  );
}