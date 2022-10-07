import React, { useRef, useState } from "react";

import ReactCrop, {
  centerCrop,
  Crop,
  makeAspectCrop,
  PixelCrop,
} from "react-image-crop";
import { canvasPreview } from "./CanvasPreview";

import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  OutlinedInput,
  useTheme,
} from "@mui/material";
import { useDebounceEffect } from "hooks/useDebounceEffect";
import "react-image-crop/dist/ReactCrop.css";

import { yupResolver } from "@hookform/resolvers/yup";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import { LoadingButton } from "@mui/lab";
import { IconCrop, IconMinus, IconPhotoCancel, IconPlus } from "@tabler/icons";
import { FormItem } from "model/common";
import { Image } from "model/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { ImageService } from "services/image.service";
import { CreateImageDTO } from "shared/dto/image.dto";
import { useDispatch } from "store";
import Container from "typedi";
import * as yup from "yup";
import { openSnackbar } from "store/slices/template/notification";
import {
  defaultErrorAlert,
  defaultSuccessAlert,
} from "components/Common/Notification/Snackbar";
import { getErrorMessage } from "model/http";
const imageService = Container.get(ImageService);

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

const schema = yup
  .object({
    name: yup.string().required(),
  })
  .required();

interface IData {
  handleChangeWatch: () => void;
}

export default function CropImage({ handleChangeWatch }: IData) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [imgSrc, setImgSrc] = useState("");
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState<number | undefined>(16 / 9);

  const onCancelUpload = () => {
    setImgSrc("");
  };

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader?.result?.toString() || "")
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate
        );
      }
    },
    100,
    [completedCrop, scale, rotate]
  );

  function handleToggleAspectClick() {
    if (aspect) {
      setAspect(undefined);
    } else if (imgRef.current) {
      const { width, height } = imgRef.current;
      setAspect(16 / 9);
      setCrop(centerAspectCrop(width, height, 16 / 9));
    }
  }

  const onSubmitFile = () => {
    if (previewCanvasRef.current) {
      return previewCanvasRef.current.toDataURL();
    }
  };

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<Image>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Image> = (data) => {
    console.log(data);
    const image = onSubmitFile();
    if (image) {
      imageService
        .uploadImage(
          new CreateImageDTO({
            data: [{ ...data, image, isBanner: true }],
          })
        )
        .then((res) => {
          console.log(res);
          dispatch(openSnackbar(defaultSuccessAlert("Upload ảnh thành công")));
          handleChangeWatch();
          onCancelUpload();
        })
        .catch((err) => {
          console.log(err);
          const errorMessage = getErrorMessage(err);
          dispatch(openSnackbar(defaultErrorAlert(errorMessage)));
        });
    }
  };

  const form: FormItem<Image>[] = [
    {
      id: "name",
      label: "Mô tả",
    },
    {
      id: "link",
      label: "Link theo mô tả",
    },
  ];

  const action = [
    [
      {
        icon: <IconPlus />,
        handler: () => setScale(scale + 0.1),
      },
      {
        icon: <IconMinus />,
        handler: () => setScale(scale - 0.1),
      },
    ],
    [
      {
        icon: <RotateLeftIcon />,
        handler: () => setRotate(rotate - 1),
      },
      {
        icon: <RotateRightIcon />,
        handler: () => setRotate(rotate + 1),
      },
    ],
    [
      {
        icon: <IconCrop />,
        handler: () => handleToggleAspectClick(),
      },
      {
        icon: <IconPhotoCancel />,
        handler: () => onCancelUpload(),
      },
    ],
  ];

  return (
    <Grid sx={{ pb: 1 }}>
      <Button variant="contained" component="label">
        Upload
        <input hidden type="file" accept="image/*" onChange={onSelectFile} />
      </Button>

      {Boolean(imgSrc) && (
        <Grid>
          <Grid p={1}>
            <form onSubmit={handleSubmit(onSubmit)}>
              {form.map((item, index) => (
                <FormControl
                  key={index}
                  fullWidth
                  error={Boolean(errors[item.id])}
                  sx={{ ...theme.typography.customInput }}
                >
                  <InputLabel>{item.label}</InputLabel>
                  <OutlinedInput
                    {...register(item.id)}
                    fullWidth
                    id={item.id}
                    name={item.id}
                    autoComplete={item.id}
                  />
                  {errors[item.id] && (
                    <FormHelperText error>
                      {errors[item.id]?.message}
                    </FormHelperText>
                  )}
                </FormControl>
              ))}
              <LoadingButton
                type="submit"
                fullWidth
                color="primary"
                variant="contained"
                size="large"
                disabled={isSubmitting}
                loading={isSubmitting}
              >
                Tải Banner lên
              </LoadingButton>
            </form>
          </Grid>
          <Grid display="flex">
            <Grid
              sx={{
                width: "30%",
              }}
            >
              {Boolean(completedCrop) && (
                <canvas
                  ref={previewCanvasRef}
                  style={{
                    border: "1px solid black",
                    objectFit: "contain",
                    width: completedCrop ? "100%" : 0,
                  }}
                />
              )}
            </Grid>
            <Grid>
              {action.map((item, index) => (
                <Grid key={index}>
                  {item.map(({ handler, icon }, index) => (
                    <IconButton onClick={handler} key={index}>
                      {icon}
                    </IconButton>
                  ))}
                </Grid>
              ))}
            </Grid>
          </Grid>
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={aspect}
          >
            <Box
              component="img"
              ref={imgRef}
              alt="Crop me"
              src={imgSrc}
              style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
              onLoad={onImageLoad}
              width="60%"
            />
          </ReactCrop>
        </Grid>
      )}
    </Grid>
  );
}
