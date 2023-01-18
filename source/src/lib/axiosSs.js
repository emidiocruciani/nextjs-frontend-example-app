import Axios from 'axios'

const axiosSs = Axios.create({
  baseURL: process.env.INTERNAL_BACKEND_URL,
  headers: {
    'referer':  process.env.NEXT_PUBLIC_URL,
  }
})

export default axiosSs
