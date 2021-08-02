import { ActionReducerMap } from "@ngrx/store";
import { userReducer, UserState } from "./reducers/user.reducer";
import { usersReducer, UsersState } from "./reducers/users.reducer";

export interface AppState {
  users: UsersState,
  user: UserState
}

export const appReducers: ActionReducerMap<AppState> = {
  users: usersReducer,
  user: userReducer
}
