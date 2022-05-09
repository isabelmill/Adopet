import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pet } from 'src/app/models/pet.model';
import { PetService } from 'src/app/services/pet.service';

@Component({
    selector: 'pet-preview',
    templateUrl: './pet-preview.component.html',
    styleUrls: ['./pet-preview.component.scss']
})
export class PetPreviewComponent implements OnInit {

    constructor(private petService: PetService,) { }
    @Input() pet: Pet
    @Output('remove') onRemove = new EventEmitter<string>()

    ngOnInit(): void {

    }

    async makeFavorite(ev: MouseEvent ){
        ev.stopPropagation();
        this.pet.isLiked = !this.pet.isLiked
        await this.petService.save({ ...this.pet }).toPromise()
    }

    onRemovePet(ev: MouseEvent, petId: string) {
        ev.stopPropagation()
        this.onRemove.emit(this.pet._id)

    }

}
