import SearchIcon from "@mui/icons-material/Search";
import { alpha, Grid, styled } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import useDebounce from "hooks/useDebounce";
import { ChangeEvent, useEffect, useState } from "react";

const Search = styled(Grid)(({ theme }) => ({
  position: "relative",
  borderRadius: "20px",
  // borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.85),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "black",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "black",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "150px",
      "&:focus": {
        width: "250px",
      },
    },
    [theme.breakpoints.down("md")]: {
      width: "100px",
    },
  },
}));
export default function SearchHeader() {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([
    {
      name: "ip 12",
      image:
        "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTaVFQEf45pAWjuGP1kINzrnVPiX8DvZEllR9y8Ty4h7R6OgHMSGLyJelR1zLh4ZJSFjENzHamFtTI&usqp=CAc",
    },
    {
      name: "ip 12",
      image:
        "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTaVFQEf45pAWjuGP1kINzrnVPiX8DvZEllR9y8Ty4h7R6OgHMSGLyJelR1zLh4ZJSFjENzHamFtTI&usqp=CAc",
    },
    {
      name: "ip 12",
      image:
        "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTaVFQEf45pAWjuGP1kINzrnVPiX8DvZEllR9y8Ty4h7R6OgHMSGLyJelR1zLh4ZJSFjENzHamFtTI&usqp=CAc",
    },
  ]);
  const debounce = useDebounce(search);
  const handleChangeSearch = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setSearch(value);
  };

  useEffect(() => {
    if (search) {
      console.log(search);
    }
  }, [debounce, search]);
  return (
    <Grid>
      <Search>
        <SearchIconWrapper>
          <SearchIcon
            sx={{
              color: "black",
            }}
          />
        </SearchIconWrapper>
        <StyledInputBase
          value={search}
          onChange={handleChangeSearch}
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
    </Grid>
  );
}
