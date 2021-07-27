import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { load } from 'src/app/store/actions/users.actions';
import { AppState } from 'src/app/store/app.reducers';

@Component({
  selector: 'app-users-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  users: User[] = [];
  loading: boolean = false;
  error: any;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(load());

    this.store.select('users').subscribe((users) => {
      this.users = users.list;
      this.loading = users.loading;
      this.error = users.error;
    });
  }
}
