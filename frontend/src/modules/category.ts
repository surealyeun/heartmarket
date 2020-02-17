import { ActionType, createAction, createReducer } from "typesafe-actions";

// 액션 타입
export const IS_CATEGORY = "category/IS_CATEGORY";

// 액션 객체 생성함수 선언
export const isCategory = createAction(IS_CATEGORY)();

// 액션 객체 타입 준비
type CategoryAction = ActionType<typeof isCategory>;

// Reducer
// 초기 상태 type 설정
export type CategoryState = {
    status: boolean;
};

const initialState: CategoryState = {
    status: false
};

const categoryStatus = createReducer<CategoryState, CategoryAction>(initialState, {
    [IS_CATEGORY]: state => {
        return {
            status: !state.status
        }
    }
});
export default categoryStatus;
