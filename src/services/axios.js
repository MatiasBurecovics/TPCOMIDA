import axios from 'axios';

const ApiKey = "efadfd8ef47e432c9e630a51440739f7";

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
export const getPlatosBySearchName = async (name) => {
    return axiosClientApi.get(`/complexSearch/?apikey=${ApiKey}&s=${name}`)
        .then((response) => {
            return response.data;
        }).catch((error) => {
            throw error;
        });
}

export const getPlatosById = async (id) => {
    return axiosClientApi.get(`/complexSearch/?apikey=${ApiKey}&i=${id}`)
        .then((response) => {
            return response.data;
        }).catch((error) => {
            throw error;
        });
}
