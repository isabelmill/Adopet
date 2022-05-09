import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/userservice/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {

  constructor(private userService: UserService) { }

  public loggedinUser : any

  ngOnInit(): void {
    this.loggedinUser = this.userService.getUser()
  }



}
