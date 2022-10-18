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
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { useParams } from "react-router";
import { getAllPatientDocuments } from "~/repositories/patientDocument.service";

const DocumentsTable = ({
  title,
  insurance,
}: {
  title: string;
  insurance?: any;
}): JSX.Element => {
  const [patientDocuments, setPatientDocuments] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const PatientDocumentService = useRef(getAllPatientDocuments);

  const { id } = useParams();

  const getPatientDocuments = useCallback(
    async (pagination: any) => {
      await PatientDocumentService.current(pagination).then(
        (response: any) => {
          setPatientDocuments(response.data.data);
        },
        (error: any) => {
          console.log(error);
        }
      );
    },
    [PatientDocumentService, setPatientDocuments]
  );

  useEffect(() => {
    getPatientDocuments({
      page: 0,
      limit: 50,
    });
  }, [getPatientDocuments]);

  console.log("patientDocuments", patientDocuments);

  const filtredData = useMemo(() => {
    const filtredPatientDocuments = patientDocuments?.filter(
      item => item.patientid == id
    );
    return filtredPatientDocuments;
  }, [patientDocuments, id]);

  return (
    <>
      <Box sx={{ p: 2 }}>
        {patientDocuments?.map((item, index) => {
          const InsuranceForm = [
            { title: "Type", content: `${item?.documenttype}` },
            { title: "Create Date", content: `${item?.createdUtc}` },
            { title: "Description", content: `${item?.documentname}` },
            { title: "Amount", content: `${item?.contactphone}` },
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
                      {field?.content}
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
