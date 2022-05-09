import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/userservice/user.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private userService: UserService) { }
  public user = { _id: 'u101', fullname: 'Admin', username: 'Admin', password: '123' }
  public loggedinUser: any

  ngOnInit(): void {
    this.userService.login(this.user)
    this.loggedinUser = this.userService.getUser()
    console.log(this.loggedinUser.fullname);
  }

}
