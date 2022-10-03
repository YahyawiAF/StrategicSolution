export type ServiceStatus = "completed" | "pending" | "failed";

export interface PatientService {
  id: string;
  firstName: string;
  lastName: string;
  status: ServiceStatus;
  details: string;
  date: number;
  patientID: string;
  sourceName: string;
  sourceDesc: string;
  amount: number;
}
