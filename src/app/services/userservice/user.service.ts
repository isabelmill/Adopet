import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../models/users.model';
import { UtilService } from '../../utilservice/utils.service';

@Injectable({
    providedIn: 'root'
})

export class UserService {


    constructor(private utilService: UtilService) { }
    private USER_KEY = 'loggedin_user';

    public _usersDb: User[] = [{ _id: '101', fullname: 'Admin', username: 'Admin', password: '123' }];

    private _users$ = new BehaviorSubject<User[]>([]);
    public users$ = this._users$.asObservable()

    public loggedinUser: Object = null

    public login(user: User): void {
        this.loggedinUser = user
        delete user.password
        this.utilService.store(this.USER_KEY, user)
    }

    // public signup(name: string): void {
    //     let user = this.UtilsService.load(this.KEY);
    //     if (!user) {
    //         let newUser = new UserModel();
    //         newUser.name = name;
    //         this.UtilsService.store(this.KEY, newUser);
    //         this._user = newUser;
    //     }
    //     this._user$.next(this._user);
    // }

    public getUser() {
        this.loggedinUser = this.utilService.load(this.USER_KEY)
        return this.loggedinUser;
    }

    // public isAuthenticated(): boolean {
    //     const user = this._user$.value;
    //     // return (user) ? true : false;
    //     return !!user;
    // }
}
