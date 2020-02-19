import { ActionType, createAction, createReducer } from "typesafe-actions";

// 액션 타입
export const IS_ZZIM = "zzim/IS_ZZIM";

// 액션 객체 생성함수 선언
export const isZzim = createAction(IS_ZZIM)();

// 액션 객체 타입 준비
type ZzimAction = ActionType<typeof isZzim>;

// Reducer
// 초기 상태 type 설정
export type ZzimState = {
    status: boolean;
};

const initialState: ZzimState = {
    status: false
};

const zzimStatus = createReducer<ZzimState, ZzimAction>(initialState, {
    [IS_ZZIM]: state => {
        return {
            status: !state.status
        }
    }
});
export default zzimStatus;
