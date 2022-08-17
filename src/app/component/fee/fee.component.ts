import { Component, OnInit } from '@angular/core';
import { PatronEditDto } from 'src/app/auth/model/user.model';
import { FeeModel } from 'src/app/model/fee.model';
import { Patron } from 'src/app/model/patron.model';
import { FeeService } from 'src/app/service/fee.service';
import { PatronService } from 'src/app/service/patron.service';

@Component({
  selector: 'app-fee',
  templateUrl: './fee.component.html',
  styleUrls: ['./fee.component.less']
})
export class FeeComponent implements OnInit {

  fees: FeeModel[];
  emptyFee: boolean;
  balance: number;

  patrons: Patron[];
  patronToEdit: Patron;
  patronToEditDto: PatronEditDto;

  constructor(private feeService: FeeService, private patronService: PatronService) { }

  ngOnInit(): void {
    this.emptyFee = false;
    
    this.patronService.getAllPatrons(0, 1000).subscribe({
      next: (data) => {
        this.patrons = data;
      },
      error: (e) => {
        //redirect to error page
      }
    });

    this.feeService.getFees().subscribe({
      next: (data) => {
        if (data[0].id != null) {
          this.fees = data;
          this.balance = data[0].patronBalance;
          console.log(data[0].patronBalance);
        } else {
          this.emptyFee = true;
          this.balance = data[0].patronBalance;
          console.log(data[0].patronBalance);
        }
        this.feeService.fee$.next(this.fees);
      },
      error: (e) => {
        console.log(e);
      }
    })

    this.feeService.fee$.subscribe(data => {
      this.fees = data;
    })
  }

  markPaid(id: number) {
    this.patronToEditDto = new PatronEditDto;

    this.patrons.forEach(p => {
      if(p.name === this.fees[id].patronName) {
        this.patronToEdit = p;
      }
    })

    this.balance -= eval(this.fees[id].total.toString());

    this.patronToEditDto.id = this.patronToEdit.id;
    this.patronToEditDto.name = this.patronToEdit.name;
    this.patronToEditDto.cardexpirationdate = this.patronToEdit.cardexpirationdate;
    this.patronToEditDto.balance = this.balance;
    this.patronToEditDto.username = this.patronToEdit.username;

    this.patronService.putPatron(this.patronToEditDto).subscribe({
      next: (data) => {

      }
    })

    this.feeService.updateFee(this.fees[id]).subscribe({
      next: (data) => {
        let pName = this.fees[id].patronName;
        this.fees[id] = data;
        this.fees[id].patronName = pName;
        this.feeService.fee$.next(this.fees);
      }
    });
  }

}
