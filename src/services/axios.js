import axios from 'axios';

const axiosClientLogin = axios.create({
  baseURL: "http://challenge-react.alkemy.org/"
})

export const axiosLogIn = async (user) => {
  try {
    const response = await axiosClientLogin.post('', { ...user });
    return response.data;
  } catch (exc) {
    throw error;
  }
}
