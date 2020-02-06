import { combineReducers } from "redux";
import search from "./searchItems";

const rootReducer = combineReducers({
  search
});

export default rootReducer;

// 루트 리듀서의 반환값을 유추
export type RootState = ReturnType<typeof rootReducer>;
