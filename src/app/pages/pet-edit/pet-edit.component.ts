import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pet } from 'src/app/models/pet.model';
import { PetService } from 'src/app/services/pet.service';

@Component({
    selector: 'pet-edit',
    templateUrl: './pet-edit.component.html',
    styleUrls: ['./pet-edit.component.scss']
})
export class PetEditComponent implements OnInit {

    constructor(
        private petService: PetService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    pet: Pet

    ngOnInit(): void {
        // this.pet = <Pet>this.petService.getEmptyPet()
        this.route.data.subscribe(async ({ pet }) => {
            this.pet = pet._id ? pet : this.petService.getEmptyPet() as Pet
        })

        // // this.pet = <Pet>this.petService.getEmptyPet()
        // this.route.params.subscribe(async ({ id }) => {
        //     this.pet = id ? await this.petService.getById(id).toPromise() : this.petService.getEmptyPet() as Pet
        // })
    }

    async onSavePet() {
        await this.petService.save({ ...this.pet }).toPromise()
        this.router.navigateByUrl('pets')
    }

    handleBirthDateChange(birthDate: string) {
        console.log('handleBirthDateChange -> birthDate', birthDate)
        this.pet.birthDate = new Date(birthDate)
    }

}
