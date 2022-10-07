import { Box, Grid, IconButton } from "@mui/material";
import { Image } from "model/image";
import Carousel from "react-material-ui-carousel";
import { IconTrash } from "@tabler/icons";

interface IData {
  data: Image[];
  handleRemoveImage?: (id: string) => void;
}

export default function Banner({ data, handleRemoveImage }: IData) {
  return (
    <Box sx={{ width: "auto", typography: "body1" }}>
      <Carousel animation="slide" duration={1000} navButtonsAlwaysVisible>
        {data.map((item, index) => (
          <Grid key={index}>
            {handleRemoveImage && (
              <Grid
                sx={{
                  position: "absolute",
                  right: 50,
                  zIndex: 99,
                }}
              >
                <IconButton
                  color="error"
                  onClick={() => handleRemoveImage(item.id)}
                >
                  <IconTrash size={30} />
                </IconButton>
              </Grid>
            )}

            <Box
              component="img"
              width="100%"
              height="100%"
              sx={{
                objectFit: "cover",
              }}
              alt={item.name}
              src={item.image}
              loading="lazy"
            />
          </Grid>
        ))}
      </Carousel>
    </Box>
  );
}
