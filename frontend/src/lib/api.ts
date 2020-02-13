import axios from "axios";

export async function getPost(
  id: number = 0,
  url: string,
  email: string
) {
  console.log(url + `no=${id}&email=${email}`);
  const response = await axios.get<Post>(url + `no=${id}&email=${email}`);
  return response.data;
}

export interface Post {
  data: PostItem[];
}
export interface PostItem {
  tradeNo: number;
  tlist: null;
  unicname: string;
  pprice: string;
  ttitle: string;
  tarea: string;
  uno: number;
  uimg:string
}
