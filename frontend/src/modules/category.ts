import { ActionType, createAction, createReducer } from "typesafe-actions";

// 액션 타입
export const IS_CATEGORY = "category/IS_CATEGORY";
export const CATEGORY_TYPE = "category/CATEGORY_TYPE";

// 액션 객체 생성함수 선언
export const isCategory = createAction(IS_CATEGORY)();
export const setCategory = createAction(CATEGORY_TYPE)<string>();

// 액션 객체 타입 준비
const actions = { isCategory, setCategory };
type CategoryAction = ActionType<typeof actions>;

// Reducer
// 초기 상태 type 설정
export type CategoryState = {
  status: boolean;
  type: string;
};

const initialState: CategoryState = {
  status: false,
  type: window.sessionStorage.getItem("searchCategory") || "0"
};

const categoryStatus = createReducer<CategoryState, CategoryAction>(
  initialState,
  {
    [IS_CATEGORY]: state => {
      return {
        ...state,
        status: !state.status
      };
    },
    [CATEGORY_TYPE]: (state, action) => {
      return {
        ...state,
        type: action.payload
      };
    }
  }
);
export default categoryStatus;
