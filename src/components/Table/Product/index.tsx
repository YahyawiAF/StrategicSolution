import { FC, ChangeEvent, useState, useMemo } from "react";
import {
  Tooltip,
  Divider,
  Box,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Typography,
  useTheme,
  SelectChangeEvent,
  styled,
} from "@mui/material";

import { makeStyles } from "@mui/styles";

import Label from "@components/Label";
import { ServiceStatus } from "~/types/patienTable";
import { IPagination, IProducts } from "~/types";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import BulkActions from "./BulkActions";
import { useNavigate } from "react-router-dom";
interface IProductTableProps {
  className?: string;
  productServices: IProducts[];
  pagination: IPagination;
  handleLimitChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handlePageChange: (event: any, newPage: number) => void;
}

interface Filters {
  status?: ServiceStatus | null;
  query?: string | undefined;
}

const getStatusLabel = (ServiceStatus: ServiceStatus): JSX.Element => {
  const map = {
    failed: {
      text: "Failed",
      color: "error",
    },
    completed: {
      text: "Completed",
      color: "success",
    },
    pending: {
      text: "Pending",
      color: "warning",
    },
  };

  const { text, color }: any = map[ServiceStatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (
  productServices: IProducts[],
  filters: Filters
): IProducts[] => {
  return productServices.filter(productsService => {
    let matches = true;
    const { status, query } = filters;
    if (
      status &&
      //productsService.status !== filters.status
      true
    ) {
      matches = false;
    }
    if (query) {
      matches = Object.keys(productsService).some(key => {
        return productsService[key].toString().toLowerCase();
        // .indexOf(query.toLowerCase()) > -1
      });
    }

    return matches;
  });
};

const statusOptions = [
  {
    id: "all",
    name: "All",
  },
  {
    id: "completed",
    name: "Completed",
  },
  {
    id: "pending",
    name: "Pending",
  },
  {
    id: "failed",
    name: "Failed",
  },
];

const applyPagination = (
  productServices: IProducts[],
  page: number,
  limit: number
): IProducts[] => {
  return productServices.slice(page * limit, page * limit + limit);
};

const useStyles = makeStyles({
  customTableContainer: {
    overflowX: "initial",
  },
  head: {
    backgroundColor: "#fff",
    position: "sticky",
    top: 0,
  },
});

const ProductTable: FC<IProductTableProps> = ({
  productServices,
  pagination,
  handleLimitChange,
  handlePageChange,
}) => {
  const classes = useStyles();
  const [selectedProductServices, setSelectedProductServices] = useState<
    number[]
  >([]);
  const navigate = useNavigate();
  // const selectedBulkActions = useMemo(
  //   () => selectedProductServices.length > 0,
  //   [selectedProductServices]
  // );
  const [filters, setFilters] = useState<Filters>({
    status: null,
    query: "",
  });

  const CardStyled = styled(Card)(
    () => `
      && {
        box-shadow: unset;
        border-radius:0;
      }
  `
  );

  // const handleStatusChange = (event: SelectChangeEvent): void => {
  //   let value: string | null = null;

  //   if (event.target.value !== "all") {
  //     value = event.target.value as ServiceStatus;
  //   }
  //   setFilters(prevFilters => ({
  //     ...prevFilters,
  //     status: value as ServiceStatus,
  //   }));
  // };

  const handleSelectAllProductServices = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedProductServices(
      event.target.checked
        ? productServices.map((productsService: any) => productsService.Id)
        : []
    );
  };

  const handleSelectOneProductService = (
    event: ChangeEvent<HTMLInputElement>,
    ProductServiceId: number
  ): void => {
    if (!selectedProductServices.includes(ProductServiceId)) {
      setSelectedProductServices(prevSelected => [
        ...prevSelected,
        ProductServiceId,
      ]);
    } else {
      setSelectedProductServices(prevSelected =>
        prevSelected.filter(id => id !== ProductServiceId)
      );
    }
  };

  const filteredProductServices = useMemo(
    () => applyFilters(productServices, filters),
    [filters, productServices]
  );

  const paginatedProductServices = applyPagination(
    filteredProductServices,
    pagination.page,
    pagination.limit
  );
  const selectedSomeProductServices =
    selectedProductServices.length > 0 &&
    selectedProductServices.length < productServices.length;
  const selectedAllProductServices =
    selectedProductServices.length === productServices.length;
  const theme = useTheme();

  const EditProduct = (id: number, name: string): void => {
    navigate(`/insurance/${id}?name=${name}`);
  };

  const onHandleSearch = (event: ChangeEvent<HTMLInputElement>): void => {
    setFilters(filters => ({ ...filters, query: event.target.value }));
  };

  return (
    <CardStyled>
      <Box flex={1} p={1}>
        <BulkActions search={filters.query} onHandleSearch={onHandleSearch} />
      </Box>
      <Divider />
      <TableContainer
        sx={{ overflow: "initial" }}
        classes={{ root: classes.customTableContainer }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllProductServices}
                  indeterminate={selectedSomeProductServices}
                  onChange={handleSelectAllProductServices}
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>sku</TableCell>
              <TableCell align="center">Type</TableCell>
              <TableCell align="center">list Price</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedProductServices.map(productsService => {
              const isProductServiceSelected = selectedProductServices.includes(
                productsService.Id
              );
              return (
                <TableRow
                  hover
                  key={productsService.Id}
                  selected={isProductServiceSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isProductServiceSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneProductService(event, productsService.Id)
                      }
                      value={isProductServiceSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                      onClick={() =>
                        EditProduct(productsService.Id, productsService.Name)
                      }
                    >
                      {productsService.Name}
                    </Typography>
                  </TableCell>
                  <TableCell
                    onClick={() =>
                      EditProduct(productsService.Id, productsService.Name)
                    }
                  >
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {productsService.SKU}
                    </Typography>
                  </TableCell>
                  <TableCell
                    onClick={() =>
                      EditProduct(productsService.Id, productsService.Name)
                    }
                    align="center"
                  >
                    <Typography variant="body1" color="text.primary">
                      {productsService.Type}
                    </Typography>
                  </TableCell>
                  <TableCell
                    onClick={() =>
                      EditProduct(productsService.Id, productsService.Name)
                    }
                    align="center"
                  >
                    <Typography variant="body1" color="text.primary">
                      {productsService.ListPrice}
                    </Typography>
                  </TableCell>
                  <TableCell
                    onClick={() =>
                      EditProduct(productsService.Id, productsService.Name)
                    }
                    align="center"
                  >
                    {getStatusLabel("completed")}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit Product" arrow>
                      <IconButton
                        onClick={() =>
                          EditProduct(productsService.Id, productsService.Name)
                        }
                        sx={{
                          "&:hover": {
                            background: theme.colors.primary.lighter,
                          },
                          color: theme.palette.primary.main,
                        }}
                        color="inherit"
                        size="small"
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Product" arrow>
                      <IconButton
                        sx={{
                          "&:hover": { background: theme.colors.error.lighter },
                          color: theme.palette.error.main,
                        }}
                        color="inherit"
                        size="small"
                      >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredProductServices.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={pagination.page}
          rowsPerPage={pagination.limit}
          rowsPerPageOptions={[10, 50, 100, 500]}
        />
      </Box>
    </CardStyled>
  );
};

export default ProductTable;
