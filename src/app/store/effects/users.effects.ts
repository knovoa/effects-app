import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EMPTY, of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { UserService } from "src/app/services/user.service";
import * as usersActions from "../actions/users.actions";

@Injectable()
export class UsersEffects {

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}

  loadUsers$ = createEffect(() => this.actions$.pipe(
    ofType(usersActions.load),
    mergeMap(() => this.userService.getUsers()
      .pipe(
        map(users => usersActions.loadSuccess({users})),
        catchError(error => of(usersActions.loadError({error})))
      )
    )
  ));
}
