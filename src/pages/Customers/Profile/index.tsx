import { FC, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import Page from "@components/Page";
import ColapsableSubPage from "~/components/ColapsableSubPage";
import { Get } from "~/repositories/patients.servise";
import Adress from "./Adress";
import { Box, Divider, Typography, styled } from "@mui/material";
import { useParams } from "react-router";
import { getAllPatientInsurance } from "~/repositories/patientInsurance.servise";
import NotesTable from "./Notes";
import DocumentsTable from "./Documents";
import ProfileForm from "./ProfileForm";
import TasksTag from "~/components/Tasks";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { ReactComponent as Plus } from "~/assets/icons/plus.svg";
import { ReactComponent as Clock } from "~/assets/icons/clock.svg";
import { ReactComponent as Bolt } from "~/assets/icons/bolt.svg";
import { ReactComponent as Connect } from "~/assets/icons/connect.svg";
import PhoneTable from "./PhoneTable";

interface EditMenuProps {
  visible: boolean;
}

interface BalanceBoxProps {
  title: string;
  balance: string;
}

const BalanceBox: FC<BalanceBoxProps> = ({ title, balance }) => {
  return (
    <StyledBox>
      <StyledTitle>{title}</StyledTitle>
      <StyledBalnce>{`$${balance}`}</StyledBalnce>
    </StyledBox>
  );
};

function CustomersPage() {
  const [patient, setPatient] = useState();
  const [isEditMenuVisible, setIsEditMenuVisible] = useState<boolean>(false);
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
        <Box display="flex" gap="10px">
          <EditSideMenu visible={isEditMenuVisible}>
            <Box
              p="5px"
              display="flex"
              justifyContent={isEditMenuVisible ? "space-between" : "center"}
              alignItems="center"
              height={"79px"}
              sx={{ borderBottom: "1px solid #000" }}
            >
              <Typography
                display={isEditMenuVisible ? "block" : "none"}
                variant="h4"
              >
                TaskList
              </Typography>
              <MenuIcon
                onClick={() => setIsEditMenuVisible(!isEditMenuVisible)}
              />
            </Box>
            <Divider />
            {isEditMenuVisible ? <TasksTag /> : null}
          </EditSideMenu>
          <Box display="flex" flexDirection="column" gap="10px">
            <Box display="flex" height="100px" sx={{ background: "#FFF" }}>
              <IconBox>
                <Plus />
                <Clock />
                <Bolt />
              </IconBox>
              <Divider orientation="vertical" />
              <PatientCard>
                <Typography fontWeight="600 !important">
                  7EEBF9, 15FA2
                </Typography>
                <Typography fontWeight="600 !important">
                  02/01/1964, 58 Years
                </Typography>
                <Typography fontWeight="600!important">
                  Other, Team: 0
                </Typography>
                <Typography fontWeight="600!important">
                  Patient ID: 3622001
                </Typography>
                <Typography>Acc No: AEC7F57E58CB95</Typography>
              </PatientCard>
              <Divider orientation="vertical" />
              <PatientCard>
                <Typography fontWeight="600!important">
                  7EEBF9, 15FA2
                </Typography>
                <Typography>02/01/1964, 58 Years</Typography>
                <Typography>Other, Team: 0</Typography>
                <Typography>Patient ID: 3622001</Typography>
                <Typography>Acc No: AEC7F57E58CB95</Typography>
              </PatientCard>
              <Divider orientation="vertical" />
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                width="30%"
                gap="1px"
              >
                <Box display="flex" justifyContent="center" gap="10px">
                  <BalanceBox title="gg" balance="777" />
                  <BalanceBox title="gg" balance="777" />
                </Box>
                <Box display="flex" justifyContent="center" gap="10px">
                  <BalanceBox title="gg" balance="777" />
                  <BalanceBox title="gg" balance="777" />
                </Box>
              </Box>
            </Box>
            <Box display="flex" gap="10px">
              <Box width="60%" display="flex" flexDirection="column" gap="10px">
                <ColapsableSubPage
                  edit={true}
                  add={false}
                  title={"Patient Details"}
                  expanded={true}
                >
                  <ProfileForm edit={false} patient={patient} />
                  <PhoneTable />
                </ColapsableSubPage>

                <ColapsableSubPage edit={true} add={true} title={"Notes"}>
                  <NotesTable title="UNAMED" />
                </ColapsableSubPage>
                <ColapsableSubPage edit={true} add={true} title={"Documents"}>
                  <DocumentsTable title="UNAMED" />
                </ColapsableSubPage>
              </Box>
              <Box width="40%" display="flex" flexDirection="column" gap="10px">
                <ColapsableSubPage
                  edit={true}
                  add={true}
                  title={"Insurance"}
                  expanded={true}
                >
                  <Box
                    pt={2}
                    pb={4}
                    display="flex"
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
                    display="flex"
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
                    display="flex"
                    flexDirection="column"
                    gap="12px"
                  >
                    <Adress title="Test" />
                  </Box>
                </ColapsableSubPage>
              </Box>
            </Box>
          </Box>
        </Box>
      </Page>
    </>
  );
}

const EditSideMenu = styled("div", {
  shouldForwardProp: prop => prop !== "visible",
})<EditMenuProps>(
  ({ theme, visible }) => `
  width: ${visible ? "500px" : "50px"};
  height: 100vh;
  background: #E9E9E9;
  z-index: 11;
  transition: width 0.5s;
      border-top: 1px solid #cecbcb;
    box-shadow: 5px 12px 9px rgb(0 0 0 / 10%);
    overflow: auto;
  form {
    padding: 25px;
    div {
      display: block;
    }
  }
`
);

const StyledBox = styled(Box)(
  () => `
    && {
      width: 90px;
      background: rgb(0 0 0 / 10%);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 8px;
      padding: 5px 8px;
      border-radius: 2.5px;
    }
`
);

const IconBox = styled(Box)(
  () => `
    && {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 10px;
      padding: 10px;
    }
`
);

const PatientCard = styled(Box)(
  () => `
    && {
      width: 30%;
      height: 100px;
      background: #FFF;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 8px 70px;
      border-radius: 2.5px;
       div {
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 14px;
      }
    }
`
);

const StyledTitle = styled(Typography)(
  () => `
    && {
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 14px;

      color: #AAADBA;
    }
`
);

const StyledBalnce = styled(Typography)(
  () => `
    && {
      font-style: normal;
      font-weight: 700;
      font-size: 14px;
      line-height: 16px;

      color: #000000;
    }
`
);

export default CustomersPage;
