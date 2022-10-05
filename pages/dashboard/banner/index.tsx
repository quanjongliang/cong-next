import { LoadingButton } from "@mui/lab";
import { Button, Grid, Stack, Typography } from "@mui/material";
import { AxiosError } from "axios";
import Banner, { IBannerData } from "components/Common/Banner";
import { defaultSuccessAlert } from "components/Common/Notification/Snackbar";
import DashboardLayout from "components/Layout/AdminLayout/DashboardLayout";
import React, { useState } from "react";
import { CloundinaryService } from "services/cloudinary.service";
import { UploadBannerDTO } from "shared/dto/upload-banner.dto ";
import { useDispatch } from "store";
import { openSnackbar } from "store/slices/template/notification";
import Container from "typedi";

const bannerService = Container.get(CloundinaryService);
export default function DashboardBanner() {
  const dispatch = useDispatch();
  const [file, setFile] = useState<IBannerData[]>([]);
  const [fileList, setFileList] = useState<FileList | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const uploadMultiFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    setFileList(files);
    if (files) {
      const fileUrl = [];
      for (let i = 0; i < files.length; i++) {
        const url = URL.createObjectURL(files[i]);
        fileUrl.push({ id: `${i}`, label: files[i].name, image: url });
      }
      setFile(fileUrl);
    }
  };

  const onSubmit = () => {
    if (fileList) {
      setIsLoading(true);
      const formData = new FormData();
      for (let index = 0; index < 3; index++) {
        formData.append("files", fileList[index]);
      }
      bannerService
        .uploadBanner(new UploadBannerDTO(formData))
        .then((res) => {
          dispatch(
            openSnackbar(defaultSuccessAlert("Upload banner successfully!"))
          );
        })
        .catch((err) => {
          console.log(err);
          const errorMessage = err?.response?.data?.message || "Có lỗi xảy ra";
          dispatch(openSnackbar(defaultSuccessAlert(errorMessage)));
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <DashboardLayout>
      <Grid display="flex">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Button variant="contained" component="label" disabled={isLoading}>
            Upload
            <input
              hidden
              accept="image/*"
              multiple
              type="file"
              onChange={uploadMultiFile}
            />
          </Button>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={2}>
          <LoadingButton
            variant="contained"
            component="label"
            loading={isLoading}
            onClick={onSubmit}
          >
            Confirm
          </LoadingButton>
        </Stack>
      </Grid>
      {file.length > 0 && (
        <Grid>
          <Typography variant="h3">Preview</Typography>
          <Banner data={file} />
        </Grid>
      )}
    </DashboardLayout>
  );
}
