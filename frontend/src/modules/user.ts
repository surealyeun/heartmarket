import { ActionType, createAction, createReducer } from "typesafe-actions";

// 액션 타입
export const IS_LOG = "user/IS_LOG";

// 액션 객체 생성함수 선언
export const isLog = createAction(IS_LOG)();

// 액션 객체 타입 준비
type UserAction = ActionType<typeof isLog>;

// Reducer
// 초기 상태 type 설정
export type UserState = {
    status: string | null;
};

console.log(sessionStorage.getItem("log"))
const initialState: UserState = {
    status: sessionStorage.getItem("log")
};

const userStatus = createReducer<UserState, UserAction>(initialState, {
    [IS_LOG]: state => {
        if (state.status === "true") {
            return {
                status: "false"
            };
        } else if(state.status === 'false' || 'null') {
            return {
                status: "true"
            };
        }else{
            return {
                status: "null"
            };
        }
    }
});
export default userStatus;
