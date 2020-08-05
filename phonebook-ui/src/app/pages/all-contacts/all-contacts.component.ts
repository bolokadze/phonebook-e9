import {Component, OnInit} from '@angular/core';
import {UserService} from "../../common/service/user.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-all-contacts',
  templateUrl: './all-contacts.component.html',
  styleUrls: ['./all-contacts.component.css']
})
export class AllContactsComponent implements OnInit {
  message: string;



  constructor(private service: UserService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.loadPage();
  }


  loadPage(): void {
    this.service.get().subscribe(value => value,
        error => this.router.navigate(['/login'], {relativeTo: this.route})
    );
  }
}
