import { ResetTv, Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  useTheme,
  Grid,
  Typography,
} from "@mui/material";
import { Category } from "model/category";
import { FormItem } from "model/common";
import React, { useEffect, useMemo } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface IData {
  open: boolean;
  handleVisibleDialog: () => void;
  handleSubmit: (data: Partial<Category>) => void;
  category?: Partial<Category>;
}

export default function CategoryForm({
  open,
  handleVisibleDialog,
  handleSubmit: handleSubmitCategory,
  category,
}: IData) {
  const theme = useTheme();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm<Category>();

  const onSubmit: SubmitHandler<Category> = (data) => {
    handleSubmitCategory(data);
  };

  const onCancel = () => {
    handleVisibleDialog();
  };

  const form: FormItem<Category>[] = [
    {
      id: "name",
      label: "Tên",
    },
    {
      id: "content",
      label: "Nội dung",
    },
  ];

  useEffect(() => {
    reset(category || {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, open]);
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle fontSize={25} fontWeight="bold">
        {category ? "Sửa" : "Thêm"}
      </DialogTitle>
      <DialogContent>
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
          <Grid textAlign="end">
            <Button onClick={onCancel} variant="contained" color="inherit">
              Cancel
            </Button>
            <LoadingButton
              sx={{
                ml: 1,
              }}
              type="submit"
              color="primary"
              variant="contained"
              disabled={isSubmitting}
              loading={isSubmitting}
            >
              {category ? "Sửa" : "Thêm"}
            </LoadingButton>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
}
