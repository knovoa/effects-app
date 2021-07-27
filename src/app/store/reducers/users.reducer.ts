import { Action, createReducer, on } from "@ngrx/store";
import { User } from "src/app/models/user.model";
import { load, loadSuccess, loadError } from "../actions/users.actions";

export interface UsersState {
  list: User[],
  loaded: boolean,
  loading: boolean,
  error: any
}

export const usersInitialState: UsersState = {
  list: [],
  loaded: false,
  loading: false,
  error: null
}

const _usersReducer = createReducer(
  usersInitialState,
  on(load, state => ({ ...state, loading: true })),
  on(loadSuccess, (state, { users }) => ({
    ...state,
    loaded: true,
    loading: false,
    list: [...users]
  })),
  on(loadError, (state, { error }) => ({
    ...state,
    loaded: false,
    loading: false,
    error: error
  })),
);

export function usersReducer(state: any, action: Action) {
  return _usersReducer(state, action);
}
