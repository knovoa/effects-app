import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { load } from 'src/app/store/actions/user.actions';
import { AppState } from 'src/app/store/app.reducers';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  user: User;
  loading: boolean = false;
  error: any;

  constructor(
    private router: ActivatedRoute,
    private store: Store<AppState>) {
      this.user = {id: 0, first_name: '', last_name: '', email: '', avatar: ''}
    }

  ngOnInit(): void {
    this.store.select('user').subscribe((user) => {
      this.user = user.obj;
      this.loading = user.loading;
      this.error = user.error;
    });

    this.router.params.subscribe( ({ id }) => {
      this.store.dispatch(load({ id }));
    });
  }
}
