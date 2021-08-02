import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { UserService } from "src/app/services/user.service";
import * as userActions from "../actions/user.actions";

@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}

  loadUser$ = createEffect(() => this.actions$.pipe(
    ofType(userActions.load),
    mergeMap((action) => this.userService.getUserById(action.id)
      .pipe(
        map(user => userActions.loadSuccess({user})),
        catchError(error => of(userActions.loadError({error})))
      )
    )
  ));
}
