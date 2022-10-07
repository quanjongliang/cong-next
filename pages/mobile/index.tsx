import { Box, Grid, Input } from "@mui/material";
import BaseLayout from "components/Layout/BaseLayout/BaseLayout";
import ItemBox from "components/Common/ItemBox";
import React, { useEffect } from "react";
import YouTube from "react-youtube";
import Container from "typedi";
import { CategoryService } from "services/category.service";
import { GetCategoryDTO } from "shared/dto/category.dto";
const categoryService = Container.get(CategoryService);
export default function Mobile() {
  useEffect(() => {
    categoryService
      .getAllCategory(new GetCategoryDTO())
      .then((res) => {
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <BaseLayout>
      Mobile asdasdas
      <YouTube videoId="GLvkMKkQZVY" />
      {/* <Grid display="flex" justifyContent="space-around">
        <Grid>
          {" "}
          <ItemBox />
        </Grid>
        <Grid>
          {" "}
          <ItemBox />
        </Grid>
      </Grid> */}
    </BaseLayout>
  );
}
