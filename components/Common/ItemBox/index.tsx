import {
  Box,
  Card,
  Chip,
  Grid,
  lighten,
  Rating,
  Typography,
  useTheme,
} from "@mui/material";
import { formatCurrencyVN } from "utils/currency.util";

const data = {
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

export default function ItemBox() {
  const theme = useTheme();
  const ratioSale = Math.floor(
    ((data.price - data.salePrice) / data.price) * 100
  );
  const renderPriceBox = () => {
    const { salePrice = 0, price } = data;
    const isSale = salePrice > 0;
    const textSalePrice = formatCurrencyVN(salePrice);
    const textPrice = formatCurrencyVN(price);
    return (
      <Grid pt={3} pb={1}>
        <Grid>
          <Typography color="red" variant="h3" fontFamily="Roboto">
            {isSale ? textSalePrice : textPrice}
          </Typography>
        </Grid>
        {isSale && (
          <Grid>
            <Typography
              sx={{
                textDecoration: "line-through",
                color: "gray",
              }}
              variant="h4"
            >
              {textPrice}
            </Typography>
          </Grid>
        )}
      </Grid>
    );
  };

  return (
    <Grid
      p={1}
      sx={{
        position: "relative",
        background: "white",
        width: "170px",
        borderRadius: 2,
        boxShadow: `-2px 6px 19px 2px rgba(0,0,0,0.43);
        -webkit-box-shadow: -2px 6px 19px 2px rgba(0,0,0,0.43);
        -moz-box-shadow: -2px 6px 19px 2px rgba(0,0,0,0.43);`,
      }}
    >
      {ratioSale > 0 && (
        <Chip
          color="error"
          sx={{
            borderRadius: 2,
            color: lighten(theme.palette.primary.light, 0.1),
            fontWeight: 600,
            background: lighten(theme.palette.primary.light, 0.8),
          }}
          label={`-${ratioSale}%`}
        />
      )}
      <Grid textAlign="center" p={1}>
        <Box component="img" src={data.image} width="100px" />
      </Grid>
      <Typography variant="h3">{data.name}</Typography>
      {renderPriceBox()}
      <Card
        sx={{
          p: 1,
        }}
      >
        {data.note}
      </Card>
      <Rating
        sx={{
          pt: 1,
        }}
        name="read-only"
        value={data.rating}
        readOnly
      />
    </Grid>
  );
}
