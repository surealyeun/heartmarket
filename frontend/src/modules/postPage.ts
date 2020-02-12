import { ActionType, createAction, createReducer } from "typesafe-actions";

// 액션 타입
export const DIFF_BY = "post/DIFF_BY";

// 액션 객체 생성함수 선언
export const diffBy = createAction(DIFF_BY)<number>();

// 액션 객체 타입 준비
type CounterAction = ActionType<typeof diffBy>;

// Reducer
// 초기 상태 type 설정
export type CounterState = {
  counter: any;
};

const initialState: CounterState = {
  counter: 0
};

const postPage = createReducer<CounterState, CounterAction>(initialState, {
    [DIFF_BY]: (state, action) => ({
        counter: action.payload
    })
  });
  export default postPage;
  