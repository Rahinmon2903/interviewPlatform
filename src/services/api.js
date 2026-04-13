import axios from "axios";


const api = axios.create({
    baseURL: 'http://localhost:3000/api'
})

api.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

//why are we storing token in req.headers.authorization

export default api;