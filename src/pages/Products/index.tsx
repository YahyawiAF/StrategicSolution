import {
  useState,
  useEffect,
  ChangeEvent,
  useRef,
  useCallback,
  lazy,
} from "react";

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

import { ReactComponent as Close } from "~/assets/icons/close.svg";

import ADDForm from "./AddProduct/AddForm";
import Page from "@components/Page";
import { getAllInsurances, Delete } from "~/repositories/insurance.servise";
import { IProducts, IDefaultValuesProducts, IPagination } from "~/types";
import { If, Then, Else } from "react-if";
import SuspenseLoader from "@components/SuspenseLoader";
import { useParams } from "react-router";

const InsuranceTable = lazy(() => import("@components/Table/InsuranceTable"));

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

const TABLE_PRODUCTSS_STRUCTURE: Array<string> = [
  "insurancename",
  "address",
  "city",
  "state",
];

const PRODUCT_SHARED_DATA: Record<string, string> = {
  addRoute: "/insurance/add-insurance",
  title: "Insurance List",
};

function ProductPage() {
  const [patient, setPatient] = useState<IDefaultValuesProducts | null>(null);
  const [isEditMenuVisible, setIsEditMenuVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<IProducts[]>([]);
  const [pagination, setPagination] = useState<IPagination>({
    page: 0,
    limit: 50,
  });
  const [totalRows, setTotalRows] = useState(0);

  const ServiceRepo = useRef(getAllInsurances);
  const ServiceDeleteRepo = useRef(Delete);

  const getAll = useCallback(
    async (pagination: IPagination) => {
      setIsLoading(true);
      await ServiceRepo.current(pagination).then(
        (response: any) => {
          setProducts(response.data.data);
          setTotalRows(response.data.total);
        },
        (error: any) => {
          console.log(error);
        }
      );
      setIsLoading(false);
    },
    [ServiceRepo]
  );

  useEffect(() => {
    getAll(pagination);
  }, [pagination, getAll]);

  const handlePageChange = (event: any, newPage: number): void => {
    setPagination(state => ({ ...state, page: newPage }));
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPagination(state => ({ ...state, limit: parseInt(event.target.value) }));
  };

  const onDeleteProduct = useCallback(
    async (id: number) => {
      await ServiceDeleteRepo.current(id).then(
        async (response: any) => {
          // setProducts(response.data.data);
          await getAll(pagination);
        },
        (error: any) => {
          console.log(error);
        }
      );
    },
    [ServiceDeleteRepo, pagination, getAll]
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
        <If condition={isLoading}>
          <Then>
            <SuspenseLoader />
          </Then>
          <Else>
            <InsuranceTable
              sharedData={PRODUCT_SHARED_DATA}
              tableRowColumns={TABLE_PRODUCTSS_STRUCTURE}
              pagination={pagination}
              handlePageChange={handlePageChange}
              handleLimitChange={handleLimitChange}
              onDeleteItem={onDeleteProduct}
              itemlist={products}
              basicRoute={"products"}
              totalRows={totalRows}
              onOpenMenu={handelEdit}
            />
          </Else>
        </If>
        <EditSideMenu visible={isEditMenuVisible}>
          <Box p="25px" display="flex" justifyContent="space-between">
            <Typography
              variant="h6"
              onClick={() => setIsEditMenuVisible(false)}
            >
              {patient ? "Add New Insurance" : "Edit Insurance"}
            </Typography>
            <Close onClick={() => setIsEditMenuVisible(false)} />
          </Box>
          <Divider />
          <ADDForm
            insurance={patient}
            id={patient?.id}
            onOpenMenu={handelEdit}
            onFetchData={getAll}
            pagination={pagination}
          />
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

export default ProductPage;
