import { Component, OnInit } from '@angular/core';
import { FeeModel } from 'src/app/model/fee.model';
import { FeeService } from 'src/app/service/fee.service';

@Component({
  selector: 'app-fee',
  templateUrl: './fee.component.html',
  styleUrls: ['./fee.component.less']
})
export class FeeComponent implements OnInit {

  fees: FeeModel[];
  emptyFee: boolean;
  balance: number;

  constructor(private feeService: FeeService) { }

  ngOnInit(): void {
    this.emptyFee = false;
    this.feeService.getFees().subscribe({
      next: (data) => {
        if(data[0].id != null) {
          this.fees = data;
          this.balance = data[0].patronBalance;
        } else {
          this.emptyFee = true;
          this.balance = data[0].patronBalance;
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
