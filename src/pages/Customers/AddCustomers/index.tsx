import { useState, useEffect, useCallback } from "react";
import Page from "@components/Page";
import SubPage from "@components/SubPage.tsx";
import ADDForm from "./AddForm";
import { useParams } from "react-router-dom";
import { Get } from "~/repositories/company.service";

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

function CustomersPage() {
  const [company, setCompany] = useState<IDefaultValues | null>(null);
  const { id } = useParams();

  const getCompany = useCallback(
    async (id: string) => {
      Get(id).then(
        data => {
          setCompany(data.data[0]);
        },
        error => {
          console.log(error);
        }
      );
    },
    [id]
  );

  useEffect(() => {
    if (id) {
      getCompany(id);
    }
  }, [id, getCompany]);

  return (
    <>
      <Page>
        <SubPage title={id ? "Modify Customer" : "Create Customer"}>
          <ADDForm company={company} id={id} />
        </SubPage>
      </Page>
    </>
  );
}

export default CustomersPage;
