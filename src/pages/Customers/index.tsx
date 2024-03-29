import {
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
  useRef,
  useMemo,
} from "react";

import MainTable from "@components/Table/MainTable";

import { ICompany } from "~/types";
import Page from "@components/Page";
import { getAllPatient, Delete } from "~/repositories/patients.servise";
import ADDForm from "./AddCustomers/AddForm";
import { useParams } from "react-router-dom";
import { If, Then, Else } from "react-if";
import { Get } from "~/repositories/patients.servise";
import { ReactComponent as Close } from "~/assets/icons/close.svg";
import {
  Box,
  Drawer,
  styled,
  Divider,
  useTheme,
  darken,
  BoxTypeMap,
  Typography,
} from "@mui/material";
import SuspenseLoader from "~/components/SuspenseLoader";

interface IDefaultValues {
  name: string;
  phone: string;
  email: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  country: string;
  comments: string;
  tags: string;
}

interface EditMenuProps {
  visible: boolean;
}

interface IPagination {
  page: number;
  limit: number;
}

const TABLE_PATIENTS_STRUCTURE: Array<string> = [
  "firstname",
  "lastname",
  "suffix",
  "dateofbirth",
  // "state",
];

const CUSTOMER_SHARED_DATA: Record<string, any> = {
  addRoute: "/patient/add-customer",
  title: "Patients List",
};

function CustomersPage() {
  const [patient, setPatient] = useState<IDefaultValues | null>(null);
  const { id } = useParams();
  const [customers, setCustomers] = useState<ICompany[]>([]);
  const [pagination, setPagination] = useState<IPagination>({
    page: 0,
    limit: 50,
  });
  const [totalRows, setTotalRows] = useState(0);
  const [isEditMenuVisible, setIsEditMenuVisible] = useState<boolean>(false);
  const PatientsService = useRef(getAllPatient);
  const DeleteService = useRef(Delete);

  const getCompany = useCallback(
    async (pagination: IPagination) => {
      await PatientsService.current(pagination).then(
        (response: any) => {
          setCustomers(response.data.data);
          setTotalRows(response.data.total);
        },
        (error: any) => {
          console.log(error);
        }
      );
    },
    [pagination, PatientsService]
  );

  useEffect(() => {
    getCompany(pagination);
  }, [pagination, getCompany]);

  const onDeletePatient = useCallback(
    async (id: number) => {
      await DeleteService.current(id).then(
        async (response: any) => {
          setCustomers(response.data.data);
          await getCompany(pagination);
        },
        (error: any) => {
          console.log(error);
        }
      );
    },
    [DeleteService, pagination, getCompany]
  );

  const handlePageChange = useCallback((event: any, newPage: number): void => {
    setPagination(state => ({ ...state, page: newPage }));
  }, []);

  const handleLimitChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      setPagination(state => ({
        ...state,
        limit: parseInt(event.target.value),
      }));
    },
    []
  );

  const handelEdit = useCallback(
    (record?: any) => {
      setIsEditMenuVisible(!isEditMenuVisible);
      setPatient(record);
    },
    [isEditMenuVisible]
  );

  useEffect(() => {
    if (!isEditMenuVisible) setPatient(null);
  }, [isEditMenuVisible, setPatient]);

  return (
    <>
      <Page>
        <If condition={customers.length === 0}>
          <Then>
            <SuspenseLoader />
          </Then>
          <Else>
            <MainTable
              tableRowColumns={TABLE_PATIENTS_STRUCTURE}
              handleLimitChange={handleLimitChange}
              handlePageChange={handlePageChange}
              pagination={pagination}
              onDeleteItem={onDeletePatient}
              itemlist={customers}
              basicRoute={"patient"}
              sharedData={CUSTOMER_SHARED_DATA}
              totalRows={totalRows}
              onOpenMenu={handelEdit}
            />
          </Else>
        </If>

        <EditSideMenu visible={isEditMenuVisible}>
          <Box p="25px" display="flex" justifyContent="space-between">
            <Typography variant="h6">
              {patient ? "Add New Patient" : "Edit Patient"}
            </Typography>
            <Close onClick={() => setIsEditMenuVisible(false)} />
          </Box>
          <Divider />
          <ADDForm patient={patient} id={id} onOpenMenu={handelEdit} />
        </EditSideMenu>
      </Page>
    </>
  );
}

const EditSideMenu = styled("div", {
  shouldForwardProp: prop => prop !== "visible",
})<EditMenuProps>(
  ({ theme, visible }) => `
  width: ${visible ? "33%" : "0"};
  position: absolute;
  height: 100vh;
  top: 0;
  right: ${visible ? "0" : "-46px"};
  background: #FFF;
  z-index: 11;
  transition: width 0.5s;
  box-shadow: -4px 0px 84px rgba(0, 0, 0, 0.1);
  form {
    padding: 25px;
    div {
      display: block;
    }
  }

`
);

export default CustomersPage;
