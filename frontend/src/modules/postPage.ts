import { ActionType, createAction, createReducer } from "typesafe-actions";

// 액션 타입
export const DIFF_BY = "post/DIFF_BY";
export const USER_DIFF_BY = "post/USER_DIFF_BY"
// 액션 객체 생성함수 선언
export const diffBy = createAction(DIFF_BY)<number>();
export const userDiffBy = createAction(USER_DIFF_BY)<number>()
// 액션 객체 타입 준비
type CounterAction = ActionType<typeof diffBy>;
type UserCounterAction = ActionType<typeof userDiffBy>
// Reducer
// 초기 상태 type 설정
export type CounterState = {
  counter: number
};

const initialState: CounterState = {
  counter: 0
};
const UserInitialState: CounterState = {
  counter: 0
}


export const userPostPage = createReducer<CounterState, UserCounterAction>(UserInitialState, {
  [USER_DIFF_BY]: (state, action) => ({
    counter: action.payload
  })
});

const postPage = createReducer<CounterState, CounterAction>(initialState, {
  [DIFF_BY]: (state, action) => ({
    counter: action.payload
  })
});

export default postPage;
