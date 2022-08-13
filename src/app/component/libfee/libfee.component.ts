import { Component, OnInit } from '@angular/core';
import { FeeModel } from 'src/app/model/fee.model';
import { Patron } from 'src/app/model/patron.model';
import { FeeService } from 'src/app/service/fee.service';
import { PatronService } from 'src/app/service/patron.service';

@Component({
  selector: 'app-libfee',
  templateUrl: './libfee.component.html',
  styleUrls: ['./libfee.component.less']
})
export class LibfeeComponent implements OnInit {

  constructor(private feeService: FeeService, private patronService: PatronService) { }

  fees: FeeModel[];
  patrons: Patron[];
  patronNames: string[];

  ngOnInit(): void {
    this.fetchPatrons();
  }

  fetchFeesByPatron(patronId: number) {
    this.feeService.getFeeByPatron(patronId).subscribe({
      next: (data) => {
        this.fees = data;
      }
    })
  }

  fetchPatrons() {
    this.patronService.getAllPatrons(0, 1000).subscribe({
      next: (data) => {
        this.patrons = data;
      }
    })
  }
}
