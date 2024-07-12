const {axiosInstance} = require('./index')

//Register new User

export const RegisterUser = async (value) => {
    try{
        const response = await axiosInstance.post("api/users/register", value);
        return response.data;
    }catch(error){
        console.log(error);
    }
}

export const loginUser = async (value) => {
    try{
        const response = await axiosInstance.post("api/users/login", value);
        return response.data;
    }catch(error){
        console.log(error);
    }
}