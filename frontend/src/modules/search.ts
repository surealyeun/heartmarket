import { ActionType, createAction, createReducer } from "typesafe-actions";

// 액션 타입
export const KEYWORD_CHANGE = "search/KEYWORD_CHANGE";

// 액션 객체 생성함수 선언
export const keywordChange = createAction(KEYWORD_CHANGE)<string>();

// 액션 객체 타입 준비
type SearchAction = ActionType<typeof keywordChange>;

// Reducer
// 초기 상태 type 설정
export type SearchState = {
  text: string;
};

const initialState: SearchState = {
  text: ""
};

const search = createReducer<SearchState, SearchAction>(initialState, {
    [KEYWORD_CHANGE]: (state, action) => ({
        text: action.payload
    })
  });
  export default search;
  