import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';


interface User {
  username: string | null;
}

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  title = 'Create new user';

  user: User = { username: null };

  constructor(private dialogRef: MatDialogRef<UserFormComponent>) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.dialogRef.close(this.user);
  }

}
