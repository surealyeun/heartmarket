import { combineReducers } from "redux";
import post from "./post";

const rootReducer = combineReducers({
  post,
});

export default rootReducer;

// 루트 리듀서의 반환값을 유추
export type RootState = ReturnType<typeof rootReducer>;
