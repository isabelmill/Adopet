import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pet } from 'src/app/models/pet.model';

@Component({
  selector: 'pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.scss']
})
export class PetListComponent implements OnInit {

  constructor() { }
  @Input() pets: Pet[]
  @Output('remove') onRemove = new EventEmitter<string>()

  ngOnInit(): void {
  }

}
