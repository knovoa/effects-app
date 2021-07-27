import { createAction, props } from "@ngrx/store";
import { User } from "src/app/models/user.model";

export const load = createAction('[Users] Load');

export const loadSuccess = createAction(
  '[Users] Load Success',
  props<{ list: User[] }>()
);
export const loadError = createAction(
  '[Users] Load Error',
  props<{ payload: any }>()
);
