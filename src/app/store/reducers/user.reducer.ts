import { Action, createReducer, on } from "@ngrx/store";
import { User } from "src/app/models/user.model";
import { load, loadSuccess, loadError } from "../actions/user.actions";

export interface UserState {
  id: number,
  obj: User,
  loaded: boolean,
  loading: boolean,
  error: any
}

export const userInitialState: UserState = {
  id: 0,
  obj: {id: 0, first_name: '', last_name: '', email: '', avatar: ''},
  loaded: false,
  loading: false,
  error: null
}

const _userReducer = createReducer(
  userInitialState,
  on(load, (state, { id }) => ({
    ...state,
    loading: true,
    error: userInitialState.error,
    id: id
  })),
  on(loadSuccess, (state, { user }) => ({
    ...state,
    loaded: true,
    loading: false,
    obj: { ...user }
  })),
  on(loadError, (state, { error }) => ({
    ...state,
    loaded: false,
    loading: false,
    error: error,
    obj: userInitialState.obj
  })),
);

export function userReducer(state: any, action: Action) {
  return _userReducer(state, action);
}
