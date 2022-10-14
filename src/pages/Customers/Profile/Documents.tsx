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
import {
  getAllPatientNotes,
  Create,
} from "~/repositories/patientsNotes.service";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { getAllNotes } from "~/repositories/notes.service";
import { useParams } from "react-router";

const DocumentsTable = ({
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

  // console.log("notes", notes);
  // console.log("patientNotes", patientNotes);
  // console.log("filtredData", filtredData);

  return (
    <>
      <Box sx={{ p: 2 }}>
        {filtredData.map((item, index) => {
          const InsuranceForm = [
            { title: "Type", content: `${item?.address}` },
            { title: "Create Date", content: `${insurance?.phone}` },
            { title: "Description", content: `${insurance?.contactname}` },
            { title: "Amount", content: `${insurance?.contactphone}` },
          ];
          return (
            <Box
              key={index}
              display="-webkit-box"
              borderBottom="1px solid #000"
            >
              <Box
                sx={{ p: 2 }}
                display="flex"
                alignItems="flex-start"
                flexDirection="column"
              >
                {InsuranceForm.map((field, index) => (
                  <Box key={index} display="flex" gap="8px">
                    <Typography fontSize="12px">{field?.title}</Typography>
                    <Typography fontSize="12px" fontWeight="600">
                      {item?.content}
                    </Typography>
                  </Box>
                ))}
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                width="60%"
              >
                <InsertDriveFileIcon />
              </Box>
            </Box>
          );
        })}
      </Box>
    </>
  );
};

export default DocumentsTable;
