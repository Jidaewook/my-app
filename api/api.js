import axios from 'axios';

const callApi = async (method, path, data, jwt) => {
    const headers = {
        Authrization: jwt,
        "Content-Type": "application/json"
    };
    const baseUrl = "http://passmebackend-env.eba-vtsbabpw.us-east-2.elasticbeanstalk.com"
    // const baseUrl = "http://localhost:8081"

    const fullUrl = `${baseUrl}${path}`
    if (method === "get" || method === "delete") {
        return axios[method](fullUrl, {headers});
    } else {
        return axios[method](fullUrl, data, {headers});
    }
}

export default {
    createAccount: form => callApi("post", "/users/register", form),
    login: form => callApi("post", "/users/login", form)
}