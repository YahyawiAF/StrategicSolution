import { FC, ChangeEvent, useState, useMemo } from "react";
import PropTypes from "prop-types";
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
  styled,
  SelectChangeEvent,
} from "@mui/material";

import { makeStyles } from "@mui/styles";

import Label from "@components/Label";
import { ServiceStatus } from "~/types/patienTable";
import { ICompany } from "~/types";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import BulkActions from "./BulkActions";
import { useNavigate } from "react-router-dom";
import Modal from "@components/Modal/BasicModal";

interface IPagination {
  page: number;
  limit: number;
}

interface RecentOrdersTableProps {
  className?: string;
  customers: ICompany[];
  onDeleteCustomer: (id: number) => Promise<void>;
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

const CardStyled = styled(Card)(
  () => `
    && {
      box-shadow: unset;
      border-radius:0;
    }
`
);

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

const applyFilters = (customers: ICompany[], filters: Filters): ICompany[] => {
  return customers.filter(customer => {
    let matches = true;
    const { status, query } = filters;

    if (
      status &&
      //customer.status !== filters.status
      true
    ) {
      matches = false;
    }
    if (query) {
      matches = Object.keys(customer).some(key => {
        return (
          customer[key].toString().toLowerCase().indexOf(query.toLowerCase()) >
          -1
        );
      });
    }

    return matches;
  });
};

const applyPagination = (
  customers: ICompany[],
  page: number,
  limit: number
): ICompany[] => {
  return customers.slice(page * limit, page * limit + limit);
};

const useStyles = makeStyles({
  customTableContainer: {
    overflowX: "initial",
  },
});

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({
  customers,
  onDeleteCustomer,
  pagination,
  handleLimitChange,
  handlePageChange,
}) => {
  const classes = useStyles();
  const [selectedCustomers, setCustomers] = useState<number[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedID, setSelectedID] = useState<number>();
  const selectedBulkActions = useMemo(
    () => selectedCustomers.length > 0,
    [selectedCustomers]
  );
  const [filters, setFilters] = useState<Filters>({
    status: null,
    query: "",
  });

  const handleSelectAllCustomers = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setCustomers(
      event.target.checked ? customers.map(customer => customer.id) : []
    );
  };

  const onHandleSearch = (event: ChangeEvent<HTMLInputElement>): void => {
    setFilters(filters => ({ ...filters, query: event.target.value }));
  };

  const handleSelectOneCustomer = (
    event: ChangeEvent<HTMLInputElement>,
    CustomerId: number
  ): void => {
    if (!selectedCustomers.includes(CustomerId)) {
      setCustomers(prevSelected => [...prevSelected, CustomerId]);
    } else {
      setCustomers(prevSelected =>
        prevSelected.filter(id => id !== CustomerId)
      );
    }
  };

  const filteredCustomers = useMemo(
    () => applyFilters(customers, filters),
    [applyFilters, filters, customers]
  );
  const paginatedCustomers = applyPagination(
    filteredCustomers,
    pagination.page,
    pagination.limit
  );
  const selectedSomeCustomers = useMemo(
    () =>
      selectedCustomers.length > 0 &&
      selectedCustomers.length < customers.length,
    [customers, selectedCustomers]
  );

  const selectedAllCustomers = useMemo(
    () => selectedCustomers.length === customers.length,
    [selectedCustomers, customers]
  );

  const theme = useTheme();

  const navigate = useNavigate();

  const EditCustomer = (id: number, name: string): void => {
    navigate(`/dashboard/${id}?name=${name}`);
  };

  const handleClickOpen = (id: number) => {
    setSelectedID(id);
    setOpen(true);
  };
  const handleAction = async () => {
    await onDeleteCustomer(selectedID as number);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <CardStyled>
      <Modal
        open={open}
        handleClose={handleClose}
        handleAction={handleAction}
        title={"Delete Customer"}
        contentText={"This action is permantly!"}
      />
      <Box flex={1} p={1}>
        <BulkActions
          selectedCustomers={selectedCustomers}
          onHandleSearch={onHandleSearch}
          selectedBulkActions={selectedBulkActions}
        />
      </Box>
      <Divider />
      <TableContainer classes={{ root: classes.customTableContainer }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllCustomers}
                  indeterminate={selectedSomeCustomers}
                  onChange={handleSelectAllCustomers}
                />
              </TableCell>
              <TableCell>name</TableCell>
              <TableCell>phone</TableCell>
              <TableCell>email</TableCell>
              <TableCell>city</TableCell>
              <TableCell>state</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCustomers.map(customer => {
              const isCustomerSelected = selectedCustomers.includes(
                customer.id
              );
              return (
                <TableRow hover key={customer.id} selected={isCustomerSelected}>
                  <TableCell
                    padding="checkbox"
                    onClick={() => EditCustomer(customer.id, customer.name)}
                  >
                    <Checkbox
                      color="primary"
                      checked={isCustomerSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneCustomer(event, customer.id)
                      }
                      value={isCustomerSelected}
                    />
                  </TableCell>
                  <TableCell
                    onClick={() => EditCustomer(customer.id, customer.name)}
                  >
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {customer.name}
                    </Typography>
                  </TableCell>
                  <TableCell
                    onClick={() => EditCustomer(customer.id, customer.name)}
                  >
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {customer.phone}
                    </Typography>
                  </TableCell>
                  <TableCell
                    onClick={() => EditCustomer(customer.id, customer.name)}
                  >
                    <Typography variant="body1" color="text.primary">
                      {customer.email}
                    </Typography>
                  </TableCell>
                  <TableCell
                    onClick={() => EditCustomer(customer.id, customer.name)}
                  >
                    <Typography variant="body1" color="text.primary">
                      {customer.city}
                    </Typography>
                  </TableCell>
                  <TableCell
                    onClick={() => EditCustomer(customer.id, customer.name)}
                  >
                    <Typography variant="body1" color="text.primary">
                      {customer.state}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    {getStatusLabel("completed")}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit Order" arrow>
                      <IconButton
                        onClick={() => EditCustomer(customer.id, customer.name)}
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
                    <Tooltip
                      onClick={() => handleClickOpen(customer.id)}
                      title="Delete Customer"
                      arrow
                    >
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
          count={filteredCustomers.length}
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

RecentOrdersTable.propTypes = {
  customers: PropTypes.array.isRequired,
};

RecentOrdersTable.defaultProps = {
  customers: [],
};

export default RecentOrdersTable;
