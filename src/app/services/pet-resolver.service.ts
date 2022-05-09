import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Pet } from '../models/pet.model';
import { PetService } from './pet.service';

@Injectable({
    providedIn: 'root'
})
export class PetResolverService implements Resolve<Promise<Pet>> {

    constructor(private petService: PetService) { }

    async resolve(route: ActivatedRouteSnapshot) {
        const { id } = route.params
        const pet = await this.petService.getById(id).toPromise()
        return pet
    }
}
