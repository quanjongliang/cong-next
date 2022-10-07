import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import DashboardLayout from "components/Layout/AdminLayout/DashboardLayout";
import { Category } from "model/category";
import React, { useEffect, useState } from "react";
import { CategoryService } from "services/category.service";
import {
  CreateUpdateCategoryDTO,
  GetCategoryDTO,
} from "shared/dto/category.dto";
import Container from "typedi";

import { IconPencil, IconTrash } from "@tabler/icons";
import {
  defaultErrorAlert,
  defaultSuccessAlert,
} from "components/Common/Notification/Snackbar";
import CategoryForm from "components/Modules/Category/CategoryForm";
import { IResponsePagination } from "model/common";
import { getErrorMessage } from "model/http";
import { DefaultPagination, PaginationOption } from "model/layout";
import { useDispatch } from "store";
import {
  openAlertDialog,
  openSnackbar,
} from "store/slices/template/notification";

const categoryService = Container.get(CategoryService);

const tableHead: { label: string; id: keyof Category; width: string }[] = [
  {
    label: "Tên",
    id: "name",
    width: "max-content",
  },
  {
    label: "Nội dung",
    id: "content",
    width: "70%",
  },
];

export default function Tags() {
  const dispatch = useDispatch();
  const [parentId, setParentId] = useState<string>("");
  const handleChangeParentId = (event: SelectChangeEvent) => {
    setParentId(event.target.value as string);
  };
  const [parentCategories, setParentCategories] = useState<
    IResponsePagination<Category>
  >({
    data: [],
    meta: {},
  });
  const [categories, setCategories] = useState<IResponsePagination<Category>>({
    data: [],
    meta: {},
  });
  const [pagination, setPagination] =
    useState<PaginationOption>(DefaultPagination);
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    setPagination((prev) => ({ ...prev, page: newPage + 1 }));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined
  ) => {
    event?.target.value &&
      setPagination((prev) => ({
        ...prev,
        take: parseInt(event?.target.value, 10),
      }));
  };
  const [category, setCategory] = useState<Category | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const [watch, setWatch] = useState(true);

  const handleChangeWatch = () => {
    setWatch(!watch);
  };

  const fetchCategory = (parentId?: string) => {
    categoryService
      .getAllCategory(new GetCategoryDTO({ ...pagination, parentId }))
      .then((res) => {
        const {
          data: { data },
        } = res;
        setCategories(data);
      })
      .catch((err) => {
        dispatch(openSnackbar(defaultErrorAlert(getErrorMessage(err))));
      });
  };

  const fetchParent = () => {
    categoryService
      .getAllCategory(
        new GetCategoryDTO({ parentId: categories.data[0]?.parentId || "" })
      )
      .then((res) => {
        const {
          data: { data },
        } = res;
        setParentCategories(data);
      })
      .catch((err) => {
        dispatch(openSnackbar(defaultErrorAlert(getErrorMessage(err))));
      });
  };

  const handleVisibleDialog = () => {
    setOpen(!open);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleEdit = (index: number) => {
    setCategory(categories.data[index]);
    handleVisibleDialog();
  };

  const handleCreate = () => {
    setCategory(undefined);
    handleVisibleDialog();
  };

  const handleSubmit = (data: Partial<Category>) => {
    if (!data.parentId) {
      data.parentId = parentId;
    }
    categoryService
      .createUpdateCategory(new CreateUpdateCategoryDTO(data))
      .then((res) => {
        const typeHandle = data.id ? (data?.isDeleted ? "Xoá" : "Sửa") : "Tạo";
        dispatch(
          openSnackbar(
            defaultSuccessAlert(`${typeHandle} ${data.name} thành công`)
          )
        );
        handleChangeWatch();
        !data.isDeleted && handleVisibleDialog();
        setCategory(undefined);
        !data.parentId && fetchParent();
      })
      .catch((err) => {
        dispatch(openSnackbar(defaultErrorAlert(getErrorMessage(err))));
      });
  };

  const handleDelete = (index: number) => {
    const deleteCategory = categories.data[index];
    if (deleteCategory) {
      deleteCategory.isDeleted = true;
      dispatch(
        openAlertDialog({
          open: true,
          message: `Bạn có chắc muốn xoá ${deleteCategory.name}?`,
          handleConfirm() {
            handleSubmit(deleteCategory);
          },
        })
      );
    }
  };

  useEffect(() => {
    fetchCategory(parentId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch, parentId]);

  useEffect(() => {
    fetchParent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const buttons = (index: number) => [
    {
      label: IconPencil,
      handler: () => handleEdit(index),
    },
    {
      label: IconTrash,
      handler: () => handleDelete(index),
    },
  ];
  return (
    <DashboardLayout>
      <Grid display="flex" justifyContent="space-between">
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="demo-simple-select-label">Danh mục</InputLabel>
          <Select
            id="demo-simple-select"
            size="small"
            value={parentId}
            label="Danh mục"
            onChange={handleChangeParentId}
          >
            <MenuItem value={""}>Không</MenuItem>
            {parentCategories.data.map((parent, index) => (
              <MenuItem value={parent.id} key={index}>
                {parent.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" onClick={handleCreate}>
          Create
        </Button>
      </Grid>
      <Grid pt={1}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {tableHead.map(({ label, width }, index) => (
                  <TableCell key={index} width={width}>
                    <Typography variant="h4">{label}</Typography>
                  </TableCell>
                ))}
                <TableCell width={100}>
                  <Typography variant="h4">Action</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.data.map((category, index) => (
                <TableRow key={index}>
                  {tableHead.map(({ id }, indexCell) => (
                    <TableCell
                      onClick={() => {
                        indexCell === 0 && setParentId(category.id);
                      }}
                      key={id}
                    >
                      {category[id] as string}
                    </TableCell>
                  ))}
                  <TableCell>
                    <Grid display="flex">
                      {buttons(index).map(({ label: Icon, handler }, index) => (
                        <IconButton key={index} onClick={handler}>
                          <Icon />
                        </IconButton>
                      ))}
                    </Grid>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={categories.meta.itemCount || 0}
          rowsPerPage={pagination.take || 10}
          page={(pagination.page || 0) - 1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Grid>
      <CategoryForm
        category={category}
        open={open}
        handleVisibleDialog={handleCloseDialog}
        handleSubmit={handleSubmit}
      />
    </DashboardLayout>
  );
}
