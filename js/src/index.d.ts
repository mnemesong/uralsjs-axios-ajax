import { AxiosResponse } from "axios";
export type ReactionObj = Record<string | number, (res: AxiosResponse<any, any>) => void>;
