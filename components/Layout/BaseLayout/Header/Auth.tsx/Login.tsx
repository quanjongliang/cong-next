import { yupResolver } from "@hookform/resolvers/yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  Button,
  Dialog,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import { Resolver, SubmitHandler, useForm } from "react-hook-form";
import { USER_ROLE } from "shared/business/user";
import { PASSWORD_PATTERN } from "shared/business/validation";
import { ILoginBody, LoginDTO } from "shared/dto/login.dto";
import { dispatch } from "store";
import { signIn } from "store/slices/auth/auth-api";
import * as Yup from "yup";

const resolver: Resolver<ILoginBody> = async (values) => {
  return {
    values,
    errors: {
      email: {
        type: "required",
      },
    },
  };
};

export default function Login() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<ILoginBody>({});

  const onSubmit: SubmitHandler<ILoginBody> = (data) => {
    dispatch(signIn(new LoginDTO(data)));
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <Grid>
      <Grid textAlign="center">
        <IconButton color="inherit" onClick={handleClickOpen}>
          <AccountCircleIcon fontSize="large" />
        </IconButton>
        <Typography>Login</Typography>
      </Grid>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <Grid p={3}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl
              fullWidth
              error={Boolean(errors.email)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel>Email</InputLabel>
              <OutlinedInput
                {...register("email")}
                fullWidth
                id="email"
                name="email"
                autoComplete="email"
              />
              {errors.email && (
                <FormHelperText error>{errors.email?.message}</FormHelperText>
              )}
            </FormControl>
            <FormControl
              fullWidth
              error={Boolean(errors.password)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel>Password</InputLabel>
              <OutlinedInput
                {...register("password")}
                fullWidth
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {errors.password && (
                <FormHelperText error>
                  {errors.password?.message}
                </FormHelperText>
              )}
            </FormControl>

            <Button
              type="submit"
              fullWidth
              color="primary"
              variant="contained"
              size="large"
              disabled={isSubmitting}
            >
              Login
            </Button>
          </form>
        </Grid>
      </Dialog>
    </Grid>
  );
}
