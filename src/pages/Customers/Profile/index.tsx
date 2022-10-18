import {
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
import { If, Then, Else } from "react-if";

import { ReactComponent as Plus } from "~/assets/icons/plus.svg";
import { ReactComponent as Clock } from "~/assets/icons/clock.svg";
import { ReactComponent as Bolt } from "~/assets/icons/bolt.svg";
import PhoneTable from "./PhoneTable";
import InsuranceForm from "./Forms/InsuranceForm";
import NoteForm from "./Forms/NotesForm";
import { getAllPatientNotes } from "~/repositories/patientsNotes.service";
import { getAllNotes } from "~/repositories/notes.service";
import SuspenseLoader from "~/components/SuspenseLoader";
import DocumentForm from "./Forms/DocumentsForm";

enum TaskListForm {
  TaskList = "taskList",
  InsuranceForm = "insuranceForm",
  NoteForm = "noteForm",
  DocumentForm = "documentForm",
}

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
  const [sideMenu, setSideMenu] = useState<TaskListForm>(TaskListForm.TaskList);
  const [isEditMenuVisible, setIsEditMenuVisible] = useState<boolean>(false);
  const [insurances, setInsurances] = useState<any[]>([]);
  const [editInsurances, setEditInsurance] = useState<any>([]);
  const [isEditPatient, setIsEditPatient] = useState<boolean>(false);
  const InsuranceService = useRef(getAllPatientInsurance);
  const PatientsService = useRef(Get);
  const { id } = useParams();
  const [notes, setNotes] = useState<any[]>([]);
  const [patientNotes, setPatientNotes] = useState<any[]>([]);

  const PatientNotesService = useRef(getAllPatientNotes);
  const NotesService = useRef(getAllNotes);

  const getPatientNotes = useCallback(
    async (pagination: any) => {
      await PatientNotesService.current(pagination).then(
        (response: any) => {
          setPatientNotes(response.data.data);
        },
        (error: any) => {
          console.log(error);
        }
      );
    },
    [PatientNotesService]
  );

  const getNotes = useCallback(
    async (pagination: any) => {
      await NotesService.current(pagination).then(
        (response: any) => {
          setNotes(response.data.data);
        },
        (error: any) => {
          console.log(error);
        }
      );
    },
    [NotesService]
  );

  useEffect(() => {
    getPatientNotes({
      page: 0,
      limit: 50,
    });
  }, [getPatientNotes]);

  useEffect(() => {
    getNotes({
      page: 0,
      limit: 50,
    });
  }, [getPatientNotes]);

  const getPatients = useCallback(
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
    id && getPatients(id);
  }, [id, getPatients]);

  useEffect(() => {
    getAllInsurances({
      page: 0,
      limit: 50,
    });
  }, [getAllInsurances]);

  const handleEditPatient = useCallback(() => {
    setIsEditPatient(!isEditPatient);
  }, [isEditPatient]);

  const handleEditInsurance = useCallback(
    (insurance?: any) => {
      insurance ? setEditInsurance(insurance) : setEditInsurance(undefined);
      setSideMenu(TaskListForm.InsuranceForm);
      setIsEditMenuVisible(true);
    },
    [TaskListForm, setIsEditMenuVisible, setEditInsurance]
  );

  const handleEditNotes = useCallback(() => {
    setSideMenu(TaskListForm.NoteForm);
    setIsEditMenuVisible(true);
  }, [TaskListForm, setIsEditMenuVisible]);

  const handleEditDocuments = useCallback(() => {
    setSideMenu(TaskListForm.DocumentForm);
    setIsEditMenuVisible(true);
  }, [TaskListForm, setIsEditMenuVisible]);

  const handleCloseEdit = useCallback(() => {
    setSideMenu(TaskListForm.TaskList);
  }, [TaskListForm]);

  const GetTaskList = useMemo(() => {
    switch (sideMenu) {
      case TaskListForm.TaskList:
        return <TasksTag />;
        break;
      case TaskListForm.InsuranceForm:
        return (
          <InsuranceForm
            id={editInsurances?.id}
            insurance={editInsurances}
            pagination={{ page: 0, limit: 50 }}
            onFetchData={getAllInsurances}
            onClose={handleCloseEdit}
          />
        );
        break;
      case TaskListForm.NoteForm:
        return (
          <NoteForm
            id={editInsurances?.id}
            insurance={editInsurances}
            pagination={{ page: 0, limit: 50 }}
            onFetchData={getNotes}
            onClose={handleCloseEdit}
          />
        );
        break;
      case TaskListForm.DocumentForm:
        return (
          <DocumentForm
            id={editInsurances?.id}
            insurance={editInsurances}
            pagination={{ page: 0, limit: 50 }}
            onFetchData={getNotes}
            onClose={handleCloseEdit}
          />
        );
        break;
      default:
        return <TasksTag />;
    }
  }, [sideMenu, TaskListForm, editInsurances, getAllInsurances]);

  console.log("isEditPatient", isEditPatient);

  return (
    <>
      <Page>
        <Box width="100%" display="flex" gap="10px">
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
                onClick={() => setSideMenu(TaskListForm.TaskList)}
                sx={{ cursor: "pointer" }}
              >
                TaskList
              </Typography>
              <MenuIcon
                onClick={() => {
                  setIsEditMenuVisible(!isEditMenuVisible);
                  setSideMenu(TaskListForm.TaskList);
                }}
              />
            </Box>
            <Divider />
            {isEditMenuVisible ? GetTaskList : null}
          </EditSideMenu>
          <Box width="100%" display="flex" flexDirection="column" gap="10px">
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
                  <BalanceBox title="Acct Balance" balance="7,645.00" />
                  <BalanceBox title="Group Balance" balance="7,645.00" />
                </Box>
                <Box display="flex" justifyContent="center" gap="10px">
                  <BalanceBox title="Acct Charges" balance="7,645.00" />
                  <BalanceBox title="Group Charges" balance="7,645.00" />
                </Box>
              </Box>
            </Box>
            <Box display="flex" gap="10px">
              <Box width="80%" display="flex" flexDirection="column" gap="10px">
                <ColapsableSubPage
                  edit={true}
                  add={false}
                  title={"Patient Details"}
                  expanded={true}
                  onClickEdit={handleEditPatient}
                >
                  <ProfileForm
                    onFetchData={getPatients}
                    edit={isEditPatient}
                    patient={patient}
                  />
                  <PhoneTable patient={patient} />
                </ColapsableSubPage>

                <ColapsableSubPage
                  expanded={false}
                  edit={false}
                  add={true}
                  title={"Notes"}
                  onAddClick={handleEditNotes}
                >
                  <If condition={patientNotes.length > 0 && notes.length > 0}>
                    <Then>
                      <NotesTable patientNotes={patientNotes} notes={notes} />
                    </Then>
                    <Else>
                      <SuspenseLoader />
                    </Else>
                  </If>
                </ColapsableSubPage>
                <ColapsableSubPage
                  expanded={false}
                  edit={false}
                  add={true}
                  title={"Documents"}
                  onAddClick={handleEditDocuments}
                >
                  <DocumentsTable title="UNAMED" />
                </ColapsableSubPage>
              </Box>
              <Box width="20%" display="flex" flexDirection="column" gap="10px">
                <ColapsableSubPage
                  edit={false}
                  add={true}
                  title={"Insurance"}
                  expanded={true}
                  onAddClick={() => handleEditInsurance()}
                >
                  <Box
                    pt={2}
                    pb={4}
                    display="flex"
                    flexDirection="column"
                    gap="5px"
                  >
                    <If condition={insurances.length > 0}>
                      <Then>
                        {insurances.map(insurance => (
                          <Adress
                            key={insurance.id}
                            title={insurance.insurancename}
                            insurance={insurance}
                            onSelectInsurance={handleEditInsurance}
                          />
                        ))}
                      </Then>
                      <Else>
                        <SuspenseLoader />
                      </Else>
                    </If>
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
                    <Adress
                      title="Sac SA"
                      onSelectInsurance={handleEditInsurance}
                    />
                    <Adress
                      title="UNAMED"
                      onSelectInsurance={handleEditInsurance}
                    />
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
                    <Adress
                      title="Test"
                      onSelectInsurance={handleEditInsurance}
                    />
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
      font-size: 10px;
      line-height: 10px;

    }
`
);

const StyledBalnce = styled(Typography)(
  () => `
    && {
      font-style: normal;
      font-weight: 700;
      font-size: 12px;
      line-height: 12px;

      color: #000000;
    }
`
);

export default CustomersPage;
