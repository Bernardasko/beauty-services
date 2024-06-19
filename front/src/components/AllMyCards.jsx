import { Card, CardContent, CardActions, CardMedia, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function AllMyCards({ beauty }) {
    return (
        <Card key={beauty._id} sx={{ width: 300, minHeight: 330 }}>
            <CardMedia
                sx={{ height: 170 }}
                image={beauty.beautyId.photo}
                title={beauty.beautyId.title}
            />
            <CardContent sx={{ textAlign: "center", padding: 1, marginBottom: 3 }}>
                <Typography gutterBottom variant="h5" component="div">
                    {beauty.beautyId.title}
                </Typography>
            </CardContent>
            <CardActions sx={{ display: "flex", justifyContent: "center" }}>
                <Link to={`/my-beauties/${beauty.beautyId._id}`}>
                    <Button size="large">More</Button>
                </Link>
            </CardActions>
        </Card>
    );
}