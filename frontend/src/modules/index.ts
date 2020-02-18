import { combineReducers } from "redux";
import post from "./post";
import postPage, { userPostPage } from "./postPage"
import search from "./search"
import userStatus from "./user"
import zzimStatus from "./zzim"
import categoryStatus from "./category"
import postFilter from "./postFilter"
import userP from "./userPost"

const rootReducer = combineReducers({
  post,
  postPage,
  userPostPage,
  search,
  userStatus,
  zzimStatus,
  categoryStatus,
  postFilter,
  userP
});

export default rootReducer;

// 루트 리듀서의 반환값을 유추
export type RootState = ReturnType<typeof rootReducer>;
