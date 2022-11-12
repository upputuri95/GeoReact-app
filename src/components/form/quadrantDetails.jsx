import { Card, CardContent, Typography } from "@mui/material";

const QuaddrantDetails = ({ quadrantColor, quadrant, oneLineaddress }) => {
  return quadrant !== "error" ? (
    <Card sx={{ minWidth: 275, mt: 8 }}>
      <CardContent style={{ backgroundColor: quadrantColor }}>
        <Typography variant="h2" component="div" color="white">
          {quadrant}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="white">
          {oneLineaddress}
        </Typography>
      </CardContent>
    </Card>
  ) : (
    ""
  );
};

export default QuaddrantDetails;
