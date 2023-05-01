import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

function wait(delay: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

export const getUsers = () => axios.get(`${BASE_URL}/users`)
  .then(response => response.data);

export const getPost = async (id: number) => {
  await wait(300);

  return axios.get(`${BASE_URL}/posts/${id}`)
    .then(response => response.data);
};

export const getComments = async (id: number) => {
  await wait(1000);

  return axios.get(`${BASE_URL}/posts/${id}/comments`)
    .then(response => response.data);
};

export const createPost = async (userId: number, body: string, title: string) => {
  await wait(1000);

  return axios.post('https://jsonplaceholder.typicode.com/posts', {
    title,
    body,
    userId,
  }, {
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then(response => response.data);
};
