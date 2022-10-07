import { Box, Card, Grid } from "@mui/material";
import React from "react";
import Carousel from "react-material-ui-carousel";
import ItemBox from "../ItemBox";
const dataItem = {
  id: "1",
  name: "IPhone 13 Pro max super vip",
  image:
    "https://cdn2.cellphones.com.vn/358x/media/catalog/product/3/_/3_225.jpg",
  price: 400000000,
  salePrice: 990000,
  note: "Thu cũ đổi mới hê hê",
  rating: 4.5,
  isPresent: true,
};
const data = [...new Array(10)].map((_, index) => ({
  ...dataItem,
  id: `${index + 1}`,
}));
export default function CarouselListItem() {
  const sliderItems = data.length > 3 ? 3 : data.length;
  const items: Array<any> = [];
  for (let i = 0; i < data.length; i += sliderItems) {
    if (i % sliderItems === 0) {
      items.push(
        <Card
          sx={{
            overflow: "scroll",
          }}
          raised
          className="Banner"
          key={i.toString()}
        >
          <Grid container spacing={0} className="BannerGrid">
            {data.slice(i, i + sliderItems).map((da, index) => {
              return <ItemBox key={index} />;
            })}
          </Grid>
        </Card>
      );
    }
  }
  return (
    <Carousel animation="slide" autoPlay={false} cycleNavigation duration={300}>
      {items}
    </Carousel>
  );
}
