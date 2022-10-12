import { IObjectKeys } from "./shared";

export interface IProduct {
  id: string;
  cover: string;
  name: string;
  price: number;
  priceSale: string;
  colors: string[];
  status: string | undefined;
}

export interface IDefaultValuesProducts {
  id?: string;
  insurancename: string;
  email: string;
  contactname: string;
  city: string;
  state: string;
  phone: string;
}

export interface IPropsproductForm {
  id?: string;
  insurance: IDefaultValuesProducts | null;
  pagination: IPagination;
  // listForienKey: { [key: string]: any };
  onOpenMenu: (record?: any) => void;
  onFetchData: (pagination: IPagination) => Promise<void>;
}

export interface IPagination {
  page: number;
  limit: number;
}

export interface IProducts extends IObjectKeys {
  Discount_10: number;
  Discount_20: number;
  ExpenseAccount: number;
  GP_1: number;
  GP_2: number;
  GP_3: number;
  Id: number;
  IncomeAccount: number;
  InventoryAssetAccount: number;
  IsDeleted: boolean;
  ListPrice: number;
  Name: string;
  ProductCategoryID: number;
  PurchaseCost: number;
  QuantityAsOfDate: Date;
  SKU: string;
  SalesPriceRate: any;
  Sales_Description: string;
  Type: number;
}
