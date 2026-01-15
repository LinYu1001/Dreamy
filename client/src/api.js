const API = "https://dreamy-server.onrender.com/api"

export const PostsAPI = {
  get: () => fetch(`${API}/posts`).then(r => r.json()),
  create: (data) =>
    fetch(`${API}/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),
  delete: (id) =>
    fetch(`${API}/posts/${id}`, { method: "DELETE" }),
  uploadFile: (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return fetch(`${API}/posts/upload`, { method: "POST", body: formData }).then(r => r.json());
  }
};

export const ContactsAPI = {
  get: () => fetch(`${API}/contacts`).then(r => r.json()),
  create: (data) =>
    fetch(`${API}/contacts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),
  delete: (id) =>
    fetch(`${API}/contacts/${id}`, { method: "DELETE" }),
};
