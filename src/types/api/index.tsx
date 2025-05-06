/* eslint-disable */

import { type AxiosResponse } from "axios";

export interface APIResponseType extends AxiosResponse {
    header: any;
    body: any;
}
