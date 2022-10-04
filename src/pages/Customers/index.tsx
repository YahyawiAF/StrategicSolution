import {
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
  useRef,
  useMemo,
} from "react";

import MainTable from "@components/Table/MainTable";

import { getAllCompany, Delete } from "~/repositories/company.service";

import { ICompany } from "~/types";
import Page from "@components/Page";
import { getAllPatient } from "~/repositories/Patients.servise";

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
  addRoute: "/dashboard/add-customer",
  title: "Patients List",
};

function CustomersPage() {
  const [customers, setCustomers] = useState<ICompany[]>([]);
  const [pagination, setPagination] = useState<IPagination>({
    page: 0,
    limit: 50,
  });
  const [totalRows, setTotalRows] = useState(0);
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

  const onDeleteCustomer = useCallback(
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

  return (
    <>
      <Page>
        <MainTable
          tableRowColumns={TABLE_PATIENTS_STRUCTURE}
          handleLimitChange={handleLimitChange}
          handlePageChange={handlePageChange}
          pagination={pagination}
          onDeleteItem={onDeleteCustomer}
          itemlist={customers}
          basicRoute={"dashboard"}
          sharedData={CUSTOMER_SHARED_DATA}
          totalRows={totalRows}
        />
      </Page>
    </>
  );
}

export default CustomersPage;
