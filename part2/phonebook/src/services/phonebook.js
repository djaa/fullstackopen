import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'


const getPhonebook = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const createPerson = newPersonData => {
    const request = axios.post(baseUrl, newPersonData)
    return request.then(response => response.data)
}

const deletePerson = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response)
}

const updatePerson = (newData, id) => {
    const request = axios.put(`${baseUrl}/${id}`, newData)
    return request.then(response => response.data)
}

const expFuncs = {getPhonebook, createPerson, deletePerson, updatePerson};
export default expFuncs