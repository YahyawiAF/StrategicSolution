import { faker } from "@faker-js/faker";
import { sample } from "lodash";
import { PatientService } from "~/types";

const PRODUCT_COLOR = [
  "#00AB55",
  "#000000",
  "#FFFFFF",
  "#FFC0CB",
  "#FF4842",
  "#1890FF",
  "#94D82D",
  "#FFC107",
];

export const PRODUCTS: Array<PatientService> = [...Array(104)].map(_ => {
  return {
    id: faker.datatype.uuid(),
    firstName: faker.name.findName(),
    lastName: faker.name.lastName(),
    details: "XXX",
    date: new Date().getTime(),
    status: "completed",
    patientID: faker.address.city(),
    sourceName: "Bank Account",
    sourceDesc: "*** 1111",
    amount: parseInt(faker.commerce.price()),
  };
});
