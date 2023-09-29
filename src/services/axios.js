import axios from 'axios';

const ApiKey = "f6a06a2d8b1147378761f67e623802d0";

const axiosClientLogin = axios.create({
  baseURL: "http://challenge-react.alkemy.org/",

})

const axiosClientApi = axios.create({
  baseURL: "https://api.spoonacular.com/recipes",
  
})

export const axiosLogIn = async (user) => {
  try {
    const response = await axiosClientLogin.post('', { ...user });
    return response.data;
  } catch (exc) {
    throw error;
  }
}

export const axiosRecetas = async () => {
  try {
    const response = await axiosClientApi.get(`/complexSearch?apiKey=${ApiKey}`);
    return response.data;
  } catch (exc) {
    throw error;
  }
}

export const getPlatosByNombre = async (name) => {
  
  try {
    const response = await axiosClientApi.get(`/complexSearch?apiKey=${ApiKey}&query=${name}`);
    return response.data;
  } catch (exc) {
    throw error;
  }
}

export const getPlatosById = async (id) => {
  try {
    const response = await axiosClientApi.get(`/${id}/information?includeNutrition=false&apiKey=${ApiKey}`);
    return response.data;
  } catch (exc) {
    throw error;
  }
}
