import axios from "axios";

export async function getPost(
  id: number = 0,
  url: string,
  email: string
) {
  // console.log(url + `no=${id}&email=${email}`);
  const response = await axios.get<Post>(url + `no=${id}&email=${email}`);
  return response.data;
}

export async function getUserPost(url:string, userNo:string, page: number) {
  // console.log(url + `${userNo}`)
  const response = await axios.get<userPost>(url + `${userNo}?no=${page}`)
  return response.data
}

export async function getMapPost(url:string) {
  const response = await axios.get<any>(url+'?no=0')
  return response.data
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
  uimg:string;
  cno:number;
  category: string;
  bno: number;
}


export interface userPost {
  data: userPostItem[];
}

export interface userPostItem {
  tradeNo: number;
  pprice:  string;
  uimg:    string;
  tarea:   string;
  ttitle:  string;
}