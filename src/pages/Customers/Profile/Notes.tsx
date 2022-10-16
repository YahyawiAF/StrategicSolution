import {
  Card,
  styled,
  Grid,
  Paper,
  Box,
  Button,
  Typography,
  Divider,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionActions from "@mui/material/AccordionActions";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import AddIcon from "@mui/icons-material/Add";
import { getAllPatientNotes } from "~/repositories/patientsNotes.service";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router";
import { getAllNotes } from "~/repositories/notes.service";

const NotesTable = ({
  title,
  insurance,
}: {
  title: string;
  insurance?: any;
}): JSX.Element => {
  const [notes, setNotes] = useState<any[]>([]);
  const [patientNotes, setPatientNotes] = useState<any[]>([]);

  const PatientNotesService = useRef(getAllPatientNotes);
  const NotesService = useRef(getAllNotes);

  const { id } = useParams();

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

  // const CreatePatientNotes = useCallback(async () => {
  //   await Create({
  //     patientid: id,
  //     noteid: 1,
  //   }).then(
  //     (response: any) => {
  //       setNotes(response.data.data);
  //     },
  //     (error: any) => {
  //       console.log(error);
  //     }
  //   );
  // }, [NotesService]);

  // useEffect(() => {
  //   CreatePatientNotes();
  // }, [CreatePatientNotes]);

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

  const filtredData = useMemo(() => {
    const filtredPatientNotes = patientNotes?.filter(
      item => item.patientid == id
    );
    const NoteIds = filtredPatientNotes.map(item => item.noteid);
    const filtredNotes = notes.filter(notes =>
      NoteIds.some(filter => notes.id == filter)
    );
    return filtredNotes;
  }, [patientNotes, notes, id]);

  return (
    <>
      <Grid
        sx={{ p: 2 }}
        container
        spacing={2}
        // direction="row"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="space-between"
      >
        {filtredData.map((field, index) => (
          <Box
            key={index}
            sx={{ p: 2 }}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            height="52px"
            border="1px solid #000"
            gap="5px"
            mt="5px"
          >
            <Text fontWeight="600">{field?.note}</Text>
            <Text>{field?.createdUtc}</Text>
            <Text>{field?.title}</Text>
            <Text fontWeight="600">{field?.createdBy}</Text>
          </Box>
        ))}
      </Grid>
    </>
  );
};

const Text = styled(Typography)(
  () => `
        && {
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 14px;
        }
    `
);

export default NotesTable;
