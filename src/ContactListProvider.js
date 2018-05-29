import axios from "axios";

const API_URL = "https://randomuser.me/api/?results=10";

export default function createContactProvider() {
  let cache = [];

  return {
    async refreshCache() {
      return axios
        .get(API_URL)
        .then(response =>
          response.data.results.map(c => ({
            id: c.email,
            fullName: `${c.name.first} ${c.name.last}`,
            picture: c.picture.large
          }))
        )
        .then(contacts => (cache = contacts));
    },
    async getContacts() {
      return cache;
    },
    async filterContacts(query = "") {
      return cache.filter(c => c.fullName.includes(query.toLowerCase()));
    }
  };
}
