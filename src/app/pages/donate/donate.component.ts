import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { startWith } from 'rxjs/operators';
import { PetService } from 'src/app/services/pet.service';

@Component({
  selector: 'donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss']
})
export class DonateComponent implements OnInit {

  @ViewChild('modal') modal: ElementRef;

  constructor(private petService: PetService, private renderer: Renderer2) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (e.target == this.modal.nativeElement) {
        this.modal.nativeElement.style.display = "none";
      }
    });
  }

  ngOnInit(): void {
  }

  selectedAmount: number = 0;

  public amountList = [
    { amount: 5 },
    { amount: 25 },
    { amount: 50 },
    { amount: 75 },
    { amount: 100 },
  ];

  onSelect(amount: number): void {
    this.selectedAmount = amount;
  }

  donate(): void {
    if (!this.selectedAmount) return
    this.modal.nativeElement.style.display = "block";
    this.petService.donate(this.selectedAmount)
    this.selectedAmount = 0;
  }

}
