import axios from "axios";

const githubApi = axios.create({
  baseURL: process.env.GITHUB_API_URL,
  headers: {
    Authorization: `token ${process.env.GITHUB_TOKEN}`,
    Accept: 'application/vnd.github+json'
  }
})

export default githubApi