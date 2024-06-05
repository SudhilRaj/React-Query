import axios from "axios";

export const getUser = (id: number) => {
  return axios.get(`http://localhost:3000/users/${id}`).then(res => res.data)
}
