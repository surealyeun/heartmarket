import { combineReducers } from "redux";
import post from "./post";
import postPage from "./postPage"
import search from "./search"
import userStatus from "./user"

const rootReducer = combineReducers({
  post,
  postPage,
  search,
  userStatus
});

export default rootReducer;

// 루트 리듀서의 반환값을 유추
export type RootState = ReturnType<typeof rootReducer>;
