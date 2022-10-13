import { useCallback, useEffect, useRef, useState } from "react";
import Page from "@components/Page";
import ColapsableSubPage from "~/components/ColapsableSubPage";
import { getAllPatient } from "~/repositories/patients.servise";
import Adress from "./Adress";
import { Box, Divider, styled, Typography } from "@mui/material";
import { useParams } from "react-router";
import { getAllPatientInsurance } from "~/repositories/patientInsurance.servise";

import { ReactComponent as Close } from "~/assets/icons/close.svg";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface EditMenuProps {
  visible: boolean;
}

function TasksTag() {
  const [patients, setPatients] = useState<any[]>([]);
  const InsuranceService = useRef(getAllPatientInsurance);
  const PatientsService = useRef(getAllPatient);
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

  useEffect(() => {
    getAllPatients({
      page: 0,
      limit: 50,
    });
  }, [getAllPatients]);

  return (
    <Box p={1}>
      <ColapsableSubPage
        edit={true}
        add={true}
        icon={<ExpandMoreIcon />}
        title={"Patients"}
        expanded={false}
      >
        <Box pt={2} pb={4} display={"flex"} flexDirection="column" gap="12px">
          {patients.length > 0 &&
            patients.map(patient => (
              <Adress
                key={patient.id}
                title={patient.firstname}
                insurance={patient}
              />
            ))}
        </Box>
      </ColapsableSubPage>
    </Box>
  );
}

export default TasksTag;
