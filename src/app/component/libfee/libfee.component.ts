import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PatronEditDto } from 'src/app/auth/model/user.model';
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

  feeForm: FormGroup;
  addForm: FormGroup;

  fees: FeeModel[];
  fee: FeeModel;
  patrons: Patron[];
  selectedPatron: Patron;
  patronToEdit: PatronEditDto;
  patronNames: string[];

  emptyFee: boolean;
  showEdit: boolean;
  showAdd: boolean;
  showAddForm: boolean;
  showBalance: boolean;
  balance: string;
  editIndex: number;

  selectedOption: string;

  constructor(private feeService: FeeService, private patronService: PatronService) { }

  ngOnInit(): void {
    this.emptyFee = true;
    this.showEdit = false;
    this.showAdd = false;
    this.showAddForm = false;
    this.showBalance = false;
    this.balance = '0';
    this.fetchPatrons();
  }

  fetchFeesByPatron(patronUsername: string) {
    this.feeService.getFeeByPatronUsername(patronUsername).subscribe({
      next: (data) => {
        this.fees = data;
        if(this.fees[0].patronName === null) {
          this.emptyFee = true;
        } else {
          this.emptyFee = false;
        }
      }
    })
    this.showEdit = false;
  }

  fetchPatrons() {
    this.patronService.getAllPatrons(0, 1000).subscribe({
      next: (data) => {
        this.patrons = data;
      }
    })
  }

  select() {
    this.fetchFeesByPatron(this.selectedOption);
    this.showAdd = true;
    this.showAddForm = false;
    this.showBalance = true;
    this.patrons.forEach(p => {
      if(p.username === this.selectedOption) {
        this.selectedPatron = p;
      }
    })
    this.balance = this.selectedPatron.balance.toString();
  }

  editClicked(index: number) {
    this.showEdit = true;
    this.editIndex = index;
    this.feeForm = new FormGroup ({
      type: new FormControl(this.fees[index].feeType),
      amount: new FormControl(this.fees[index].total)
    })
  }

  onEditSubmit() {
    this.fee = new FeeModel;
    this.fee.feeType = this.feeForm.value.type;
    this.fee.total = this.feeForm.value.amount;
    this.fee.id = this.fees[this.editIndex].id;
    this.fee.patronName = this.fees[this.editIndex].patronName;
    this.fee.datePaid = this.fees[this.editIndex].datePaid;
    this.feeService.updateFee(this.fee).subscribe({
      next: (data) => {
        this.fees[this.editIndex] = this.fee;
        this.feeService.fee$.next(this.fees);
      },
      error: (e) => {
        console.log(e);
      }
    })
    this.showEdit = false;
  }

  addFee() {
    this.showAddForm = true;
    this.addForm = new FormGroup ({
      type: new FormControl(''),
      amount: new FormControl('')
    })
  }

  onAddSubmit() {
    this.showAddForm = false;
    this.patronToEdit = new PatronEditDto;
    this.fee = new FeeModel;
    this.fee.feeType = this.addForm.value.type;
    this.fee.total = this.addForm.value.amount;
    this.fee.patronName = this.selectedPatron.name;
    let balance = eval(this.selectedPatron.balance.toString());
    balance += eval(this.fee.total.toString());
    this.balance = balance;
    this.patronToEdit.balance = eval(this.balance);
    this.selectedPatron.balance = eval(this.balance);
    this.patronToEdit.id = this.selectedPatron.id;
    this.patronToEdit.name = this.selectedPatron.name;
    this.patronToEdit.cardexpirationdate = this.selectedPatron.cardexpirationdate;
    this.patronToEdit.username = this.selectedPatron.username;
    this.patronService.putPatron(this.patronToEdit).subscribe({
      next: (data) => {

      }
    })
    this.feeService.postFee(this.selectedPatron.id, this.fee).subscribe({
      next: (data)=> {
        if(this.emptyFee == true) {
          this.emptyFee = false;
          this.fees[0] = this.fee;
        } else {
          this.fees.push(this.fee);
        }
        this.feeService.fee$.next(this.fees);
      },
      error: (e) => {
        console.log(e);
      }
    })
  }
}
