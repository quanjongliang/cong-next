import { CardContent, Grid, Typography } from "@mui/material";
import ForbiddenImage from "assets/images/403-forbidden.png";
import { Card, styled } from "@mui/material";
import Image from "next/image";

export const ErrorCard = styled(Card)({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const ErrorWrapper = styled(Grid)({
  maxWidth: 500,
  margin: "0 auto",
  textAlign: "center",
});
export default function Forbidden() {
  return (
    <ErrorCard>
      <CardContent>
        <ErrorWrapper>
          <Grid container>
            <Grid item xs={12}>
              <Image src={ForbiddenImage} alt="" />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Truy cập bị từ chối</Typography>
              <Typography variant="h4" color="secondary">
                Bạn không có quyền hạn để truy cập vào trang này
              </Typography>
            </Grid>
          </Grid>
        </ErrorWrapper>
      </CardContent>
    </ErrorCard>
  );
}
