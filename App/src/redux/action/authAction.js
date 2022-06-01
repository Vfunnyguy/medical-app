import { Dispatch } from "redux";
import { getAPI } from "@/fetch";
export const getAllUserApi = async (id) => {
    const res = await getAPI(`/api/get-allUser?id=${id}`);
    return res;
}