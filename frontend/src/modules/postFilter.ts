import { ActionType, createAction, createReducer } from "typesafe-actions";
// import { PostItem } from "../lib/api";

// 액션 타입
export const FILTER_TYPE = "postFilter/FILTER_TYPE";
// export const ORDER_BY_NEW = "postFilter/ORDER_BY_NEW";
// export const ORDER_BY_DIST = "postFilter/ORDER_BY_DIST";
// export const ORDER_BY_PRICE = "postFilter/ORDER_BY_PRICE";

// 액션 객체 생성함수 선언
export const filterType = createAction(FILTER_TYPE)<number>();
// export const orderByNew = createAction(ORDER_BY_NEW)<PostItem[]>();
// export const orderByDist = createAction(ORDER_BY_DIST)<PostItem[]>();
// export const orderByPrice = createAction(ORDER_BY_PRICE)<PostItem[]>();

// 액션 객체 타입 준비
const actions = { filterType };
type FilterAction = ActionType<typeof actions>;

// Reducer
// 초기 상태 type 설정
export type FilterState = {
  num: number;
};

const initialState: FilterState = {
  num: 3
};

const postFilter = createReducer<FilterState, FilterAction>(initialState, {
  [FILTER_TYPE]: (state, action) => {
    return {
      num: action.payload
    };
  }
});
export default postFilter;
