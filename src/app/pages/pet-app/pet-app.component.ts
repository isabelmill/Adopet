import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Pet } from 'src/app/models/pet.model';
import { PetService } from 'src/app/services/pet.service';
import { UserMsgService } from 'src/app/services/user-msg.service';

@Component({
    selector: 'pet-app',
    templateUrl: './pet-app.component.html',
    styleUrls: ['./pet-app.component.scss']
})
export class PetAppComponent implements OnInit, OnDestroy {

    constructor(private petService: PetService, private userMsgService: UserMsgService) { }
    subscription: Subscription
    pets: Pet[]
    pets$: Observable<Pet[]>
    // prm = new Promise((resolve) => {
    //     setTimeout(() => {
    //         resolve('resolved!')
    //     }, 800);
    // })

    ngOnInit(): void {
        this.petService.query()
        this.pets$ = this.petService.pets$
        
        this.subscription = this.petService.pets$.subscribe(pets => {
            this.pets = pets
        })
    }

    onRemovePet(petId: string) {
        console.log('petId pet app:', petId)
        this.petService.remove(petId)
        this.userMsgService.setMsg(`Pet (${petId}) removed!`)

    }



    ngOnDestroy(): void {
        // this.subscription.unsubscribe()
    }

}
