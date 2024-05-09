"use client"
import axios from "axios";

const http = axios.create();

http.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("accessToken")

    config.headers.Authorization = `Bearer ${token}`

    return config;
},
    (error) => {
        Promise.reject(error)
    })

// Response interceptor for API calls
// http.interceptors.response.use((response) => {
//     return response
//   }, 
//   async function (error) {
//     const originalRequest = error.config;
    
//     if ((error.response.status === 403 || error.response.status === 401) && !originalRequest._retry) {

//       originalRequest._retry = true;

//       const access_token = await refreshAccessToken();            
//       axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
//       return axiosApiInstance(originalRequest);
//     }
//     return Promise.reject(error);
//   });

//   const refreshIdToken = async () => {
//     const  = useGoogleOAuth();
//     if (auth2.isSignedIn.get()) {
//         try {
//             const currentUser = auth2.currentUser.get();
//             const authResponse = await currentUser.reloadAuthResponse();
//             const newIdToken = authResponse.id_token;
//             console.log('New ID token:', newIdToken);
//             // Handle the new ID token
//         } catch (error) {
//             console.error('Error refreshing ID token:', error);
//             // Handle error refreshing token
//         }
//     } else {
//         console.warn('User is not signed in');
//         // Handle case when user is not signed in
//     }
// };

export default http