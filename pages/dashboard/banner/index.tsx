import { Grid, Typography } from "@mui/material";
import Banner from "components/Common/Banner";
import DashboardLayout from "components/Layout/AdminLayout/DashboardLayout";
import CropImage from "components/Modules/CropImage";
import { Image } from "model/image";
import { useEffect, useState } from "react";
import { ImageService } from "services/image.service";
import { DeleteImageByIdDTO, GetImageBannerDTO } from "shared/dto/image.dto";
import { useDispatch } from "store";
import { openAlertDialog } from "store/slices/template/notification";
import Container from "typedi";

const imageService = Container.get(ImageService);
export default function DashboardBanner() {
  const dispatch = useDispatch();
  const [banners, setBanners] = useState<Image[]>([]);
  const [watch, setWatch] = useState(false);

  const handleChangeWatch = () => {
    setWatch(!watch);
  };

  const removeImageById = (id: string) => {
    imageService
      .deleteImageById(new DeleteImageByIdDTO({ id }))
      .then((res) => {
        // console.log(res);
        handleChangeWatch();
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  const handleRemoveImage = (id: string) => {
    dispatch(
      openAlertDialog({
        handleConfirm() {
          removeImageById(id);
        },
        message: "Bạn có chắc muốn xoá ảnh này?",
        open: true,
      })
    );
  };

  useEffect(() => {
    imageService
      .getBanner(new GetImageBannerDTO())
      .then((res) => {
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
