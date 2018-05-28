import axios from "axios";

const API_URL = "https://randomuser.me/api/?results=10";

// export const getContacts = () =>
//   axios.get(API_URL).then(response =>
//     response.data.results.map(c => ({
//       id: c.email,
//       fullName: `${c.name.first} ${c.name.last}`
//     }))
//   );
export const getContacts = () => Promise.resolve([]);
