import { AuthService } from './../services/auth.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-projectmanagement',
  templateUrl: './projectmanagement.component.html',
  styleUrls: ['./projectmanagement.component.css'],
})
export class ProjectmanagementComponent implements OnInit {
  editCache: { [key: string]: any } = {};
  selected: any;
  submitted1 = false;
  submitted2 = false;
  submitted3 = false;
  submitted4 = false;
  isDisabled = true;
  dependent: any;
  project: any;
  department: any;
  employee: any;
  selectedgender: string = '';
  readioSelected: any;
  tabvalue: any;
  projectvalue: any;
  departmentvalue: any;
  employeevalue: any;
  doj: any;
  workexp!: any;
  lat: number = 51.673858;
  lng: number = 7.815982;

  gender = [
    { id: '1', value: 'Male' },
    { id: '2', value: 'Female' },
  ];
  dateParts!: number;
  dependentIndex: any;
  edit!: boolean;
  parts: any;
  date: any;
  projectIndex: any;
  departmentIndex!: number;
  employeeIndex!: number;
  constructor(
    private formBuilder: FormBuilder,
    private config: NgbDatepickerConfig,
    private api: AuthService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<ProjectmanagementComponent>,
    private NgbDateParserFormatter: NgbDateParserFormatter
  ) {
    const current = new Date();
    // config.minDate = { year: current.getFullYear(), month: current.getMonth() + 1, day: current.getDate() };
    config.maxDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate(),
    };
    config.outsideDays = 'hidden';
    sessionStorage.setItem('deletedItems', JSON.stringify(this.projectvalue));

    this.tabvalue = [];
    this.projectvalue = [];
    this.departmentvalue = [];
    this.employeevalue = [];
  }

  ngOnInit(): void {
    this.getAllProduct();
    this.dependent = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z_ ]+$')]],
      gender: ['', Validators.required],
      relationship: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z_ !@#$%^&*]+$'),
        ],
      ],
    });

    this.project = this.formBuilder.group({
      projectno: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9]*$'),
          Validators.maxLength(6),
        ],
      ],
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z_ ]+$')]],
      location: ['', Validators.required],
    });

    this.department = this.formBuilder.group({
      department: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9]*$'),
          Validators.maxLength(6),
        ],
      ],
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z_ ]+$')]],
      code: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z_ ]+$'),
          Validators.maxLength(3),
        ],
      ],
    });

    this.employee = this.formBuilder.group({
      id: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]+$'),
          Validators.maxLength(5),
        ],
      ],
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z_ ]+$')]],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      dob: ['', Validators.required],
      doj: ['', Validators.required],
      work: ['', Validators.required],
      dependentt: ['', Validators.required],
      projectt: ['', Validators.required],
      departmentt: ['', Validators.required],
    });

    // if (this.editData) {
    //   this.dependent.controls["name"].setValue(this.editData.name);
    //   this.dependent.controls["gender"].setValue(this.editData.gender);
    //   this.dependent.controls["relationship"].setValue(this.editData.relationship);
    // }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.dependent.controls;
  }

  get h(): { [key: string]: AbstractControl } {
    return this.project.controls;
  }

  get i(): { [key: string]: AbstractControl } {
    return this.department.controls;
  }

  get j(): { [key: string]: AbstractControl } {
    return this.employee.controls;
  }

  getAllProduct() {
    this.tabvalue = [];
    this.projectvalue = [];
    this.departmentvalue = [];
    this.employeevalue = [];
  }

  radioChangeHandler(event: any) {
    this.selectedgender = this.readioSelected;
  }

  deleteItem(rowvalue: any) {
    for (let i = 0; i <= this.tabvalue.length; i++) {
      if (rowvalue == this.tabvalue[i]) {
        this.tabvalue.splice(i, 1);
      }
    }
  }

  adddependent() {
    this.submitted1 = true;

    if (this.dependent.invalid) {
      return;
    }
    if (this.dependent.valid) {
      if (!this.edit) {
        this.tabvalue.push(this.dependent.value);
        this.onResetdependent();
      } else {
        this.tabvalue[this.dependentIndex] = this.dependent.value;
        this.edit = false;
        this.onResetdependent();
      }
    }
  }

  onResetdependent(): void {
    this.submitted1 = false;
    this.dependent.reset();
  }

  editItem(rowvalue: any, index: number) {
    this.edit = true;
    this.dependent.controls['name'].setValue(rowvalue.name);
    this.dependent.controls['gender'].setValue(rowvalue.gender);
    this.dependent.controls['relationship'].setValue(rowvalue.relationship);
    this.dependentIndex = index;
  }

  addproject() {
    this.submitted2 = true;
    if (this.project.invalid) {
      return;
    }
    if (this.project.valid) {
      if (!this.edit) {
        this.projectvalue.push(this.project.value);
        this.onResetproject();
      } else {
        this.projectvalue[this.projectIndex] = this.project.value;
        this.edit = false;
        this.onResetproject();
      }
    }
  }

  onResetproject(): void {
    this.submitted2 = false;
    this.project.reset();
  }

  editProject(row: any, index: number) {
    this.edit = true;
    this.project.controls['projectno'].setValue(row.projectno);
    this.project.controls['name'].setValue(row.name);
    this.project.controls['location'].setValue(row.location);
    this.projectIndex = index;
  }

  deleteprojectItem(row: any) {
    for (let i = 0; i <= this.projectvalue.length; i++) {
      if (row == this.projectvalue[i]) {
        this.projectvalue.splice(i, 1);
      }
    }
  }

  adddepartment() {
    this.submitted3 = true;
    if (this.department.invalid) {
      return;
    }
    if (this.department.valid) {
      if (!this.edit) {
        this.departmentvalue.push(this.department.value);
        this.onResetdepartment();
      } else {
        this.departmentvalue[this.departmentIndex] = this.department.value;
        this.edit = false;
        this.onResetdepartment();
      }
    }
  }
  onResetdepartment(): void {
    this.submitted3 = false;
    this.department.reset();
  }

  editDepartment(row: any, i: number) {
    this.edit = true;
    this.department.controls['department'].setValue(row.department);
    this.department.controls['name'].setValue(row.name);
    this.department.controls['code'].setValue(row.code);
    this.departmentIndex = i;
  }

  deletedepartmentItem(row: any) {
    for (let i = 0; i <= this.departmentvalue.length; i++) {
      if (row == this.departmentvalue[i]) {
        this.departmentvalue.splice(i, 1);
      }
    }
  }

  addemployee() {
    this.submitted4 = true;
    if (this.employee.invalid) {
      return;
    }
    if (this.employee.valid) {
      if (!this.edit) {
        // let dob=this.employee
        // let dobdate=dob.toString(dob.dob)
        let ngbDate = this.employee.controls['dob'].value;
        this.NgbDateParserFormatter.format(ngbDate);
        this.employeevalue.push(this.employee.value);
        this.onResetemployee();
      } else {
        6;
        this.employeevalue[this.employeeIndex] = this.employee.value;
        this.edit = false;
        this.onResetemployee();
      }
    }
  }

  onResetemployee(): void {
    this.submitted4 = false;
    this.employee.reset();
  }

  editemployee(employee: any, i: number) {
    this.edit = true;
    this.employee.controls['id'].setValue(employee.id);
    this.employee.controls['name'].setValue(employee.name);
    this.employee.controls['gender'].setValue(employee.gender);
    this.employee.controls['address'].setValue(employee.address);
    this.employee.controls['dob'].setValue(employee.dob);
    this.employee.controls['doj'].setValue(employee.doj);
    this.employee.controls['work'].setValue(employee.work);
    this.employee.controls['dependentt'].setValue(employee.dependentt);
    this.employee.controls['projectt'].setValue(employee.projectt);
    this.employee.controls['departmentt'].setValue(employee.departmentt);
    this.employeeIndex = i;
  }

  deleteemployeeItem(employee: any) {
    for (let i = 0; i <= this.employeevalue.length; i++) {
      if (employee == this.employeevalue[i]) {
        this.employeevalue.splice(i, 1);
      }
    }
  }

  calculateDiff() {
    this.date = this.doj.month + '/' + this.doj.day + '/' + this.doj.year;
    var date1 = new Date(this.date);
    var date2 = new Date();

    var startYear = date1.getFullYear();
    var startMonth = date1.getMonth();
    var startDay = date1.getDate();

    var endYear = date2.getFullYear();
    var endMonth = date2.getMonth();
    var endDay = date2.getDate();

    var february =
      (endYear % 4 == 0 && endYear % 100 != 0) || endYear % 400 == 0 ? 29 : 28;
    var daysOfMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    var startDateNotPassedInEndYear =
      endMonth < startMonth || (endMonth == startMonth && endDay < startDay);
    var years = endYear - startYear - (startDateNotPassedInEndYear ? 1 : 0);

    var months =
      (12 + endMonth - startMonth - (endDay < startDay ? 1 : 0)) % 12;

    // (12 + ...) % 12 makes sure index is always between 0 and 11
    var days =
      startDay <= endDay
        ? endDay - startDay
        : daysOfMonth[(12 + endMonth - 1) % 12] - startDay + endDay;

    //   var Time = Math.floor(date2.getTime() - date1.getTime());
    //   var day = 1000 * 60 * 60 * 24;
    // var days = Math.floor(Time/day);
    // var months = Math.floor(days/31);
    // var years = Math.floor(months/12);
    let noday = days + ' Days ';
    let nomonths = months + ' Months ';
    let noyears = years + ' Years';
    this.workexp = `${noyears} ${nomonths} ${noday}`;
  }
}
