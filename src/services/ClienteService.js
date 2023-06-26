import api from "../lib/axios";

export default {
  register(data){
    return api.post("/auth/signup", data)
  },
  registerThird(data){
    return api.post("/auth/thirdsignup", data)
  },
  login(data) {
    return api.post("/auth/ownsignin", data);
  },
  authentication(data){
    return api.post('/auth/thirdsignin', data)
  },
  getUserById(id){
    return api.get(`/user/${id}`)
  },
  getAllUsers(){
    return api.get('/user/all')
  },
  deleteUserById(userId){
    return api.delete(`/user/${userId}`)
  },
  updateUserById(userId, userData){
    return api.post(`/user/${userId}`, userData)
  },
  checkthird(user){
    return api.post('/auth/checkthird', user)
  },
  logout(user){
    return api.post('/logout', user)
  },
  banUser(id){
    return api.delete(`/user/${id}`)
  },
  unBanUser(id){
    return api.post(`/user/revive/${id}`)
  }
};