import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Pet } from 'src/app/models/pet.model';
import { PetService } from 'src/app/services/pet.service';

@Component({
    selector: 'pet-details',
    templateUrl: './pet-details.component.html',
    styleUrls: ['./pet-details.component.scss']
})
export class PetDetailsComponent implements OnInit {

    constructor(
        private petService: PetService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    pet: Pet

    msg: string
    msg$: Observable<string>

    async ngOnInit() {

        this.route.data.subscribe(data=>{
           this.pet = data.pet
        })

        // this.route.params.subscribe(async params => {
        //     const pet = await this.petService.getById(params.id).toPromise()
        //     // const pet = await lastValueFrom(this.petService.getById(params.id))
        //     this.pet = pet
        // })

        // this.route.params.pipe(switchMap((params) => this.petService.getById(params.id)))
        //     .subscribe(pet=>{
        //         this.pet = pet
        //     })


        // NOT GOOD, never subscribe inside subscribe 
        // this.route.params.subscribe(params => {
        //     this.petService.getById(params.id).subscribe(pet=>{
        //         this.pet = pet
        //     })
        // })

    }

    onBack() {
        this.router.navigateByUrl('pets')
        // this.router.navigate([''])
    }

    onAdoptPet() {
        // this.msg$ = this.petService.shouldAdoptPet()
        this.petService.shouldAdoptPet().subscribe(msg => {
            this.msg = msg
            setTimeout(() => {
                this.msg = ''
            }, 1500);
        })
    }

}
