import { Endoints } from "../constants/types";
import { publicAxios } from "../context/AxiosContext";

const authEndpoint = Endoints.Payments;

export interface IDonate {
  amount: number;
  connectedAccountId?: string;
}

export interface IPurchase {
  amount: number;
  paymentMethodId?: string;
  targetCustomerId: string;
  productId: string;
  saveCard?: boolean;
}

export interface IAddCard {
  source: string;
}

const donate = (data: IDonate) =>
publicAxios.post(`${authEndpoint}/donate`, data);
const purchase = (data: IPurchase) =>
publicAxios.post(`${authEndpoint}/charge`, data);
const accountDetails = () => publicAxios.get(`${authEndpoint}/account/me`);

export { donate, purchase, accountDetails };
