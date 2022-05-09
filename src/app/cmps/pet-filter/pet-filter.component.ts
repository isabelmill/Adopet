import { Component, OnInit } from '@angular/core';
import { PetFilter } from 'src/app/models/pet-filter.model';
import { PetService } from 'src/app/services/pet.service';

@Component({
  selector: 'pet-filter',
  templateUrl: './pet-filter.component.html',
  styleUrls: ['./pet-filter.component.scss']
})
export class PetFilterComponent implements OnInit {

  constructor(private petService: PetService) { }
  filterBy: PetFilter

  public genderList = [
    { gender: 'male' },
    { gender: 'female' },
  ];
  public sizeList = [
    { size: 'small' },
    { size: 'medium' },
    { size: 'large' },
  ];

  ngOnInit(): void {
    this.petService.filterBy$.subscribe(filterBy => {
      this.filterBy = filterBy
    })
    this.onChangeFilter()
  }

  reset(){
    console.log('pp');
    this.filterBy.gender = ''
    this.filterBy.size = ''
    this.filterBy.term = ''
    // this.filterBy.type = ''
    this.onChangeFilter()
  }

  onChangeFilter() {
    this.petService.setFilterBy(this.filterBy)
  }

}
