import { Box, Table, Typography, TableCell, TableRow } from '@mui/material';
import { Patient } from "../../types";

interface Props {
  patients : Patient[]
}

const PatientDetail = ({ patient } : Props) => {
  return (
    <div>
      <Box>
        <Typography align="center" variant="h6">
          Patient
        </Typography>
      </Box>
      <Table>
        <TableRow key={patient.id}>
          <TableCell>{patient.name}</TableCell>
          <TableCell>{patient.gender}</TableCell>
          <TableCell>{patient.occupation}</TableCell>
        </TableRow>
      </Table>
    </div>
  );
};

export default PatientDetail;
