import { yupResolver } from "@hookform/resolvers/yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  InputAdornment,
  IconButton,
  Button,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { PASSWORD_PATTERN } from "shared/business/validation";
import { ILoginBody } from "shared/dto/login.dto";
import * as yup from "yup";
import { Save } from "@mui/icons-material";
const schema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().matches(PASSWORD_PATTERN).required(),
  })
  .required();
interface IData {
  handleLogin: (data: ILoginBody) => void;
  isLoading: boolean;
}

export default function LoginForm({ handleLogin, isLoading }: IData) {
  const theme = useTheme();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<ILoginBody>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<ILoginBody> = (data) => {
    handleLogin(data);
  };
  const form: {
    id: keyof ILoginBody;
    label: string;
    havePasswordHandle?: boolean;
  }[] = [
    {
      id: "username",
      label: "Username",
    },
    {
      id: "password",
      label: "Password",
      havePasswordHandle: true,
    },
  ];
  return (
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
            type={
              !item.havePasswordHandle || showPassword ? "text" : "password"
            }
            endAdornment={
              item.havePasswordHandle && (
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
              )
            }
          />
          {errors[item.id] && (
            <FormHelperText error>{errors[item.id]?.message}</FormHelperText>
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
        loading={isLoading}
      >
        Đăng nhập
      </LoadingButton>
    </form>
  );
}
