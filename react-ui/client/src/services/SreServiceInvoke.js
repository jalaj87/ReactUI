import axios from 'axios';
const baseUrl = 'https://01tqfm6ug0.execute-api.us-east-1.amazonaws.com/dev/fetchconfiguration'

export const fetchSreData = async (sreType) =>{
    let url = baseUrl + "?sreType=" + sreType
    let res = await axios.get(url)
    return JSON.stringify(res.data)
}

export const createUpdateSreData = async (sreType,slaPayload, isUpdate) => {
    let slaUrl = baseUrl + "?sreType=" + sreType + "&isUpdate=" + isUpdate
    let res = await axios.post(slaUrl,slaPayload)
    return JSON.stringify(res.data)
}

export const deleteSreData = async (sreType,recordId) => {
    let slaUrl = baseUrl + "?sreType=" + sreType + "&record_id=" + recordId
    let res = await axios.delete(slaUrl)
    return JSON.stringify(res.data)
}
