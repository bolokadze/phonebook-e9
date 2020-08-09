import {Component, OnInit} from '@angular/core';
import {UserService} from "../../common/service/user.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../common/model/user";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-log-in-page',
  templateUrl: './log-in-page.component.html',
  styleUrls: ['./log-in-page.component.css']
})
export class LogInPageComponent implements OnInit {

  errorMessage: string;
  form: FormGroup;
  btnClicked: boolean;

  constructor(private userService: UserService, private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.btnClicked = false;
    this.form = new FormGroup({
        email: new FormControl(null,
          [
            Validators.required,
            Validators.pattern("^[a-z0-9._-]+@[a-z0-9.-]+\\.[a-z]{2,10}$")
          ]),
        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20)
        ])
      }
    );
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    let user: User;
    user = this.form.value;

    this.btnClicked = true;

    this.userService.loginUser(user).subscribe(value => {
        this.router.navigate(['/home'], {relativeTo: this.route});
      },
      error => this.errorMessage = this.getErrorMessage(error));
  }

  getErrorMessage(error: any) {
    let message;
    if (error.status === 0)
      message = 'Server unavailable, try again later';
    else
      //TODO message = error.error.message
      message = error.error.status;
    return message;
  }
}
