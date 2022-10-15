import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ColapsableSubPage from "~/components/ColapsableSubPage";
import { getAllPatient } from "~/repositories/patients.servise";
import Adress from "./Adress";
import { Box, styled, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { getAllPatientInsurance } from "~/repositories/patientInsurance.servise";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getAllPatientTasks } from "~/repositories/patientsTaskList.service";

function TasksTag() {
  const [patients, setPatients] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const InsuranceService = useRef(getAllPatientInsurance);
  const PatientsService = useRef(getAllPatient);
  const PatientTasksService = useRef(getAllPatientTasks);
  const navigate = useNavigate();
  const { id } = useParams();

  const getAllPatients = useCallback(
    async (pagination: any) => {
      await PatientsService.current(pagination).then(
        (response: any) => {
          setPatients(response.data.data);
        },
        (error: any) => {
          console.log(error);
        }
      );
    },
    [InsuranceService]
  );

  const getAllPatientsTasks = useCallback(async () => {
    await getAllPatientTasks().then(
      (response: any) => {
        setTasks(response.data);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }, [getAllPatientTasks]);

  useEffect(() => {
    getAllPatientsTasks();
  }, [getAllPatientsTasks]);

  useEffect(() => {
    getAllPatients({
      page: 0,
      limit: 50,
    });
  }, [getAllPatients]);

  const filtredData = useMemo(() => {
    const filtredTasks = Array.from(
      new Set(
        tasks.map(data => {
          return {
            id: data.id,
            task: data.task,
            patientid: data.patientid,
            patientfullname: data.patientfullname,
          };
        })
      )
    );
    return filtredTasks;
  }, [tasks]);

  const PatientList = useCallback(
    (taskId: any) => {
      const patientIdList = tasks?.filter(task => task.id === taskId);
      const PatientIds = patientIdList.map(item => item.patientid);
      const filtredPatients = patients?.filter(patient =>
        PatientIds.some(filter => patient.id == filter)
      );
      return filtredPatients;
    },
    [patients, tasks]
  );

  return (
    <Box p={1} display="flex" flexDirection="column" gap="5px">
      {filtredData.length > 0 &&
        filtredData.map((task, index) => (
          <StyledContaner key={index}>
            <ColapsableSubPage
              edit={true}
              add={true}
              icon={<ExpandMoreIcon />}
              title={task.task}
              expanded={false}
            >
              <Box
                pt={1}
                pb={4}
                display="flex"
                flexDirection="column"
                gap="12px"
              >
                {patients.length > 0 &&
                  PatientList(task.id).map(patient => (
                    <StyledList
                      key={patient.id}
                      onClick={() =>
                        navigate(
                          `/patient/${patient?.id}?name=${patient?.firstname}`
                        )
                      }
                    >{`${patient.firstname} ${patient.lastname}`}</StyledList>
                  ))}
              </Box>
            </ColapsableSubPage>
          </StyledContaner>
        ))}
    </Box>
  );
}

const StyledContaner = styled(Box)(
  () => `
    && {
      > div {
        background: #F9F9F9;
        box-shadow: none;
      }
    }
`
);

const StyledList = styled(Box)(
  () => `
    && {
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 14px;
      color: #000000;
      cursor: pointer;
    }
`
);

export default TasksTag;
