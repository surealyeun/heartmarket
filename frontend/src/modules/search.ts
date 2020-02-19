import { ActionType, createAction, createReducer } from "typesafe-actions";

// 액션 타입
export const SEARCH_CHANGE = "search/SEARCH_CHANGE";

// 액션 객체 생성함수 선언
export const searchChange = createAction(SEARCH_CHANGE)<boolean>();

// 액션 객체 타입 준비
type SearchAction = ActionType<typeof searchChange>;

// Reducer
// 초기 상태 type 설정
export type SearchState = {
  status: boolean;
};

const initialState: SearchState = {
  status: false
};

const search = createReducer<SearchState, SearchAction>(initialState, {
    [SEARCH_CHANGE]: (state, action) => ({
        status: !action.payload
    })
  });
  export default search;
  