import axios from 'axios'

const url:string = "http://70.12.246.87:8080/trade/search/area?"
export async function getPost(id: number) {
    const response = await axios.get<Post>(url+`no=${id}&email=join@test.com`)
    return response.data
}

export interface Post {
    data: PostItem[];
}
export interface PostItem {
    tradeNo:       number;
    tradeCategory: string;
    tradeTitle:    string;
    productName:   string;
    tradeArea:     string;
    productInfo:   string;
    productPrice:  string;
    tradeDate:     Date;
    ttradeImg:     string;
    // buser:         User | null;
    // tuser:         User | number;
    tmanner:       null;
}
