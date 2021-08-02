import { createAction, props } from "@ngrx/store";
import { User } from "src/app/models/user.model";

export const load = createAction(
  '[User] Load',
  props<{ id: number }>()
);

export const loadSuccess = createAction(
  '[User] Load Success',
  props<{ user: User }>()
);
export const loadError = createAction(
  '[User] Load Error',
  props<{ error: any }>()
);
