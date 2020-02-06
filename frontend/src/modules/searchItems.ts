import * as api from "../lib/api";
import { Post, User } from "../lib/api";
import { createAsyncAction, ActionType, createReducer } from "typesafe-actions";
import { AxiosError } from "axios";
import { ThunkAction } from "redux-thunk";
import { RootState } from "./";
import { isUndefined } from "util";
// 액션 type 선언
const GET_POST = "searchItems/GET_POST";
const GET_POST_SUCCESS = "searchItems/GET_POST_SUCCESS";
const GET_POST_FAILURE = "searchItems/GET_POST_FAILURE";

const GET_USERS = "searchItems/GET_USERS";
const GET_USERS_SUCCESS = "searchItems/GET_USERS_SUCCESS";
const GET_USERS_FAILURE = "searchItems/GET_USERS_FAILURE";

// 액션 생성 함수 선언
export const getPostAsync = createAsyncAction(
  GET_POST,
  GET_POST_SUCCESS,
  GET_POST_FAILURE
)<undefined, Post, AxiosError>();

export type PostActionType = ActionType<typeof getPostAsync>;

export const getUserAsync = createAsyncAction(
  GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE
)<undefined, User, AxiosError>();

export type UserActiontype = ActionType<typeof getUserAsync>;

export type searchAction = PostActionType | UserActiontype;
//thunk 함수 생성
export function getPostThunk(
  id: number
): ThunkAction<void, RootState, null, PostActionType> {
  return async dispatch => {
    const { request, success, failure } = getPostAsync;
    dispatch(request());
    try {
      const post = await api.getPost(id);
      dispatch(success(post));
    } catch (e) {
      dispatch(failure(e));
    }
  };
}
export function getUserThunk(
  id?: number
): ThunkAction<void, RootState, null, UserActiontype> {
  return async dispatch => {
    const { request, success, failure } = getUserAsync;
    dispatch(request()); // 요청 시작
    try {
      const users = await api.getUsers(id);
      dispatch(success(users));
    } catch (e) {
      dispatch(failure(e));
    }
  };
}
// 액션 객체들에 대한 타입 선언
// 초기 상태 선언
type searchItemsState = {
  loading: {
    GET_POST: boolean;
    GET_USERS: boolean;
  };
  post: any;
  users: any;
};

const initialState: searchItemsState = {
  loading: {
    GET_POST: false,
    GET_USERS: false
  },
  post: null,
  users: null
};

// 리듀서 작성
const search = createReducer<searchItemsState, searchAction>(initialState, {
  [GET_POST]: state => ({
    ...state,
    loading: {
      ...state.loading,
      GET_POST: true // 요청 시작
    }
  }),
  [GET_POST_SUCCESS]: (state, action) => ({
    ...state,
    loading: {
      ...state.loading,
      GET_POST: false
    },
    post: action.payload
  }),
  [GET_POST_FAILURE]: (state, action) => ({
    ...state,
    loading: {
      ...state.loading,
      GET_POST: false // 요청 완료
    }
  }),
  [GET_USERS]: state => ({
    ...state,
    loading: {
      ...state.loading,
      GET_USERS: true
    }
  }),
  [GET_USERS_SUCCESS]: (state, action) => ({
    ...state,
    loading: {
      ...state.loading,
      GET_USERS: false
    },
    users: action.payload
  }),
  [GET_USERS_FAILURE]: (state, action) => ({
    ...state,
    loading: {
      ...state.loading,
      GET_USERS: true
    }
  })
});

export default search;
