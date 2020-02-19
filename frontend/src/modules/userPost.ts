import {
  createAsyncAction,
  ActionType,
  createReducer
} from "typesafe-actions";
import { userPost } from "../lib/api";
import { AxiosError } from "axios";
import { ThunkAction } from "redux-thunk";
import { RootState } from ".";
import { getUserPost } from "../lib/api";

// 액션 타입
export const GET_POST = "userPost/GET_POST";
export const GET_POST_SUCCESS = "userPost/GET_POST_SUCCESS";
export const GET_POST_FAILURE = "userPost/GET_POST_FAILURE";

// 액션 객체 생성함수 선언
export const getPostAsync = createAsyncAction(
  GET_POST,
  GET_POST_SUCCESS,
  GET_POST_FAILURE
)<undefined, userPost, AxiosError>();

// 액션 객체 타입 준비
const actions = { getPostAsync };
type PostAction = ActionType<typeof actions>;

// ThunkAction 의 Generics 에는 다음 값들을 순서대로 넣어줍니다.
/*
    1. thunk 함수에서 반환하는 값의 타입
    2. 리덕스 스토어의 상태 타입
    3. Extra Argument (https://github.com/reduxjs/redux-thunk#injecting-a-custom-argument)
    4. thunk 함수 내부에서 디스패치 할 수 있는 액션들의 타입
  */
export function getUserPostThunk(
  userNo: string,
  page: number,
): ThunkAction<void, RootState, null, PostAction> {
  return async dispatch => {
    const { request, success, failure } = getPostAsync;
    const url = "http://13.125.55.96:8080/mypage/detail/";
    //70.12.246.87, 13.125.55.96 -- 아마존 
    
    dispatch(request());
    try {
      const postData = await getUserPost(url, userNo, page);
      dispatch(success(postData));
    } catch (e) {
      dispatch(failure(e));
    }
  };
}

// Reducer
// 초기 상태 type 설정
export type PostState = {
  loading: {
    GET_POST: boolean;
  };
  isReload: boolean;
  post: any;
  isLast: boolean;
};

const initialState: PostState = {
  loading: {
    GET_POST: false
  },
  isReload: false,
  post: [],
  isLast: false
};

const userP = createReducer<PostState, PostAction>(initialState, {
  [GET_POST]: state => {
    return {
      ...state,
      loading: {
        GET_POST: true
      }
    };
  },
  [GET_POST_SUCCESS]: (state, action) => {
    let isLast = false;
    if (!action.payload.data[0]) isLast = true;
    return {
      ...state,
      loading: {
        GET_POST: false
      },
      post: state.post.concat(action.payload.data),
      isLast: isLast,
      isReload: true
    };
  },
  [GET_POST_FAILURE]: state => ({
    ...state,
    loading: {
      GET_POST: false
    }
  })
});

export default userP;
