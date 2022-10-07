import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  Button,
  Dialog,
  Grid,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import {
  defaultErrorAlert,
  defaultSuccessAlert,
} from "components/Common/Notification/Snackbar";
import { getErrorMessage } from "model/http";
import Router from "next/router";
import { useState } from "react";
import { AuthService } from "services/auth.service";
import { ILoginBody, LoginDTO } from "shared/dto/login.dto";
import { IRegisterBody, RegisterDTO } from "shared/dto/register.dto";
import { useDispatch } from "store";
import { openSnackbar } from "store/slices/template/notification";
import Container from "typedi";
import LoginForm from "./LoginForm";
import Register from "./RegisterForm";
import { IconX } from "@tabler/icons";
import { getUserInfo } from "store/slices/auth/auth-api";
const authService = Container.get(AuthService);

export default function Auth() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const [isLogin, setIsLogin] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setIsLogin(true);
    setOpen(false);
  };

  const handleLogin = (data: ILoginBody) => {
    setIsLoading(true);
    authService
      .login(new LoginDTO(data))
      .then((res) => {
        dispatch(openSnackbar(defaultSuccessAlert("Đăng nhập thành công")));
        Router.reload();
      })
      .catch((err) => {
        console.log("err", err);
        const errorMessage = getErrorMessage(err);
        dispatch(openSnackbar(defaultErrorAlert(errorMessage)));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleRegister = (data: IRegisterBody) => {
    setIsLoading(true);
    authService
      .register(new RegisterDTO(data))
      .then((res) => {
        dispatch(
          openSnackbar(defaultSuccessAlert("Đăng ký thành công, kiểm tra mail"))
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
  };

  return (
    <Grid sx={{ color: "white" }}>
      <Grid textAlign="center">
        <IconButton color="inherit" onClick={handleClickOpen}>
          <Grid>
            <AccountCircleIcon fontSize="large" />
            <Typography
              m={0}
              sx={{
                [theme.breakpoints.down("sm")]: {
                  display: "none",
                },
              }}
            >
              Đăng nhập
            </Typography>
          </Grid>
        </IconButton>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        sx={{
          zIndex: 99999,
        }}
      >
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 0,
            p: 2,
          }}
        >
          <IconX />
        </IconButton>
        <Grid p={3}>
          <Grid textAlign="center">
            <Typography variant="h3" pb={1}>
              {isLogin ? "Login" : "Register"}
            </Typography>
          </Grid>
          {isLogin ? (
            <LoginForm handleLogin={handleLogin} isLoading={isLoading} />
          ) : (
            <Register handleRegister={handleRegister} isLoading={isLoading} />
          )}
        </Grid>
        <Grid textAlign="center" pb={1}>
          <Button variant="text" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Chưa có tài khoản? Đăng ký" : "Quay về đăng nhập"}
          </Button>
        </Grid>
      </Dialog>
    </Grid>
  );
}
