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
import { IRegisterBody } from "shared/dto/register.dto";
import * as yup from "yup";

const schema = yup
  .object({
    email: yup.string().email().required(),
    username: yup.string().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    phoneNumber: yup.string().required(),
    password: yup.string().matches(PASSWORD_PATTERN).required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  })
  .required();

interface IData {
  handleRegister: (data: IRegisterBody) => void;
  isLoading: boolean;
}
export default function Register({ handleRegister, isLoading }: IData) {
  const theme = useTheme();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<IRegisterBody>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IRegisterBody> = (data) => {
    handleRegister(data);
  };

  const form: {
    id: keyof IRegisterBody;
    label: string;
    havePasswordHandle?: boolean;
    inputType?: string;
  }[] = [
    {
      id: "firstName",
      label: "First name",
    },
    {
      id: "lastName",
      label: "Last name",
    },
    {
      id: "username",
      label: "Username",
    },
    {
      id: "phoneNumber",
      label: "Phone number",
      inputType: "number",
    },
    {
      id: "email",
      label: "Email",
    },
    {
      id: "password",
      label: "Password",
      havePasswordHandle: true,
    },
    {
      id: "confirmPassword",
      label: "Confirm Password",
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
              !item.havePasswordHandle || showPassword
                ? item.inputType || "text"
                : "password"
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
        loadingPosition="start"
      >
        Đăng ký
      </LoadingButton>
    </form>
  );
}
