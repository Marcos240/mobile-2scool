import { DcpReport } from "../redux/reducer/mistake"
import { getApiService } from "./BaseApiService"
import { getApiServiceFormData } from "./BaseApiServiceFormData.ts"


export const getCriteria = async () => {
    const endpoint = `/api/app/criterias/simple-list`
    const axios = await getApiService({ queryActiveCourse: true });
    return axios.get(endpoint)
}

export const getRegulation = async () => {
    const endpoint = `/api/app/regulation/simple-list`
    const axios = await getApiService({ queryActiveCourse: true })
    return axios.get(endpoint)
}

export const getStudent = async (classId: string) => {
    const endpoint = `/api/app/classes/${classId}`
    const axios = await getApiService({ queryActiveCourse: true })
    return axios.get(endpoint)
}

export const postDcpReport = async (params: DcpReport) => {
    const endpoint = `api/app/dcp-reports`
    const axios = await getApiService({ queryActiveCourse: true, queryCurrentAccount: true });
    return axios.post(endpoint, params)
}

export const getAllDcpReports = async (input: any) => {
    try {
        const endpoint = `api/app/dcp-reports/get-my-reports`
        const apiService = await getApiService({ queryActiveCourse: true, queryCurrentAccount: true });
        const result = await apiService.post(endpoint, input)
        return result;
    } catch (error) {
        throw error;
    }
};
export const delDcpReportsId = async (id: any) => {
    try {
        const endpoint = `api/app/dcp-reports/${id}`
        const apiService = await getApiService({ queryActiveCourse: true, queryCurrentAccount: true });
        const result = await apiService.delete(endpoint)
        return result;
    } catch (error) {
        throw error;
    }
};
export const getAllLrReports = async (input: any) => {
    try {
        const endpoint = `api/app/lr-report/get-my-reports`
        const axios = await getApiService({ queryActiveCourse: true, queryCurrentAccount: true });
        return axios.post(endpoint, input)
    } catch (error) {
        throw error;
    }
};
export const postCreateLrReports = async (body: any) => {
    try {
        const endpoint = `api/app/lr-report`
        const axios = await getApiService({ queryActiveCourse: true, queryCurrentAccount: true });
        return axios.post(endpoint, body)
    } catch (error) {
        console.log(error);
        throw error;
    }
};
export const delLrpReportsId = async (id: any) => {
    try {
        const endpoint = `api/app/lr-report/${id}`
        const axios = await getApiService({ queryActiveCourse: true, queryCurrentAccount: true });
        return axios.delete(endpoint)
    } catch (error) {
        throw error;
    }
};
export const postUpdateLrReports = async (body: any, id:string) => {
    try {
        const endpoint = `api/app/lr-report/${id}`
        const axios = await getApiService({ queryActiveCourse: true, queryCurrentAccount: true });
        return axios.put(endpoint, body)
    } catch (error) {
        console.log(error);
        throw error;
    }
};
export const putEditDcpReport = async (params: DcpReport, id:string) => {
    const endpoint = `api/app/dcp-reports/${id}`
    const axios = await getApiService({ queryActiveCourse: true, queryCurrentAccount: true })
    return axios.put(endpoint, params)
};
export const getMyDcpReportId = async (id:String) => {
    const endpoint = `api/app/dcp-reports/${id}`
    const axios = await getApiService({ queryActiveCourse: true, queryCurrentAccount: true })
    return axios.get(endpoint)
};
