import { Grid, Typography } from "@mui/material";
import Banner from "components/Common/Banner";
import DashboardLayout from "components/Layout/AdminLayout/DashboardLayout";
import CropImage from "components/Modules/CropImage";
import { Image } from "model/image";
import { useEffect, useState } from "react";
import { ImageService } from "services/image.service";
import { GetImageBannerDTO } from "shared/dto/image.dto";
import Container from "typedi";

const imageService = Container.get(ImageService);
export default function DashboardBanner() {
  const [banners, setBanners] = useState<Image[]>([]);
  const [watch, setWatch] = useState(false);

  const handleChangeWatch = () => {
    setWatch(!watch);
  };

  const handleRemoveImage = (id: string) => {
    console.log(id);
  };

  useEffect(() => {
    imageService
      .getBanner(new GetImageBannerDTO())
      .then((res) => {
        console.log(res);
        const {
          data: { data: data },
        } = res;
        setBanners(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [watch]);

  return (
    <DashboardLayout>
      <CropImage handleChangeWatch={handleChangeWatch} />
      <Banner data={banners} handleRemoveImage={handleRemoveImage} />
    </DashboardLayout>
  );
}
