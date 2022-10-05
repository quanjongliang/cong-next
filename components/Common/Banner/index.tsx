import { Box, Grid } from "@mui/material";
import Carousel from "react-material-ui-carousel";

export interface IBannerData {
  id: string;
  label: string;
  image: string;
}

interface IData {
  data: IBannerData[];
}

export default function Banner({ data }: IData) {
  return (
    <Box sx={{ width: "auto", typography: "body1" }}>
      <Carousel animation="slide" duration={1000}>
        {data.map((item, index) => (
          <Grid key={index}>
            <Box
              component="img"
              width="100%"
              maxHeight="500px"
              sx={{
                objectFit: "cover",
              }}
              alt={item.label}
              src={item.image}
            />
          </Grid>
        ))}
      </Carousel>
    </Box>
  );
}
