import { useCallback, useEffect, useRef, useState } from "react";
import Page from "@components/Page";
import ColapsableSubPage from "~/components/ColapsableSubPage";
import { Get } from "~/repositories/patients.servise";
import Account from "./Account";
import Adress from "./Adress";
import { Box } from "@mui/material";
import { useParams } from "react-router";
import { getAllPatientInsurance } from "~/repositories/patientInsurance.servise";

interface EditMenuProps {
  visible: boolean;
}

function CustomersPage() {
  const [patient, setPatient] = useState();
  const [insurances, setInsurances] = useState<any[]>([]);
  const InsuranceService = useRef(getAllPatientInsurance);
  const PatientsService = useRef(Get);
  const { id } = useParams();

  const getCompany = useCallback(
    async (id: string) => {
      await PatientsService.current(id).then(
        (response: any) => {
          setPatient(response.data[0]);
        },
        (error: any) => {
          console.log(error);
        }
      );
    },
    [PatientsService]
  );

  const getAllInsurances = useCallback(
    async (pagination: any) => {
      await InsuranceService.current(pagination).then(
        (response: any) => {
          setInsurances(response.data.data);
        },
        (error: any) => {
          console.log(error);
        }
      );
    },
    [InsuranceService]
  );

  useEffect(() => {
    id && getCompany(id);
  }, [id, getCompany]);

  useEffect(() => {
    getAllInsurances({
      page: 0,
      limit: 50,
    });
  }, [getAllInsurances]);

  return (
    <>
      <Page>
        <Box display={"flex"} gap="24px">
          <Box width="60%" display={"flex"} flexDirection="column" gap="24px">
            <ColapsableSubPage
              edit={true}
              add={false}
              title={"Patient Details"}
              expanded={true}
            >
              <Account patient={patient} />
            </ColapsableSubPage>
            <ColapsableSubPage edit={true} add={true} title={"Notes"}>
              <Adress title="UNAMED" />
            </ColapsableSubPage>
            <ColapsableSubPage edit={true} add={true} title={"Documentes"}>
              <Adress title="UNAMED" />
            </ColapsableSubPage>
          </Box>
          <Box width="40%" display={"flex"} flexDirection="column" gap="24px">
            <ColapsableSubPage
              edit={true}
              add={true}
              title={"Insurance"}
              expanded={true}
            >
              <Box
                pt={2}
                pb={4}
                display={"flex"}
                flexDirection="column"
                gap="12px"
              >
                {insurances.length > 0 &&
                  insurances.map(insurance => (
                    <Adress
                      key={insurance.id}
                      title={insurance.insurancename}
                      insurance={insurance}
                    />
                  ))}
              </Box>
            </ColapsableSubPage>
            <ColapsableSubPage edit={true} add={true} title={"AtFault"}>
              <Box
                pt={2}
                pb={4}
                display={"flex"}
                flexDirection="column"
                gap="12px"
              >
                <Adress title="Sac SA" />
                <Adress title="UNAMED" />
              </Box>
            </ColapsableSubPage>
            <ColapsableSubPage edit={true} add={true} title={"Employer"}>
              <Box
                pt={2}
                pb={4}
                display={"flex"}
                flexDirection="column"
                gap="12px"
              >
                <Adress title="Test" />
              </Box>
            </ColapsableSubPage>
          </Box>
        </Box>
      </Page>
    </>
  );
}

export default CustomersPage;
