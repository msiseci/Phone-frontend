import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Person } from 'src/app/models/person';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-person-add',
  templateUrl: './person-add.component.html',
  styleUrls: ['./person-add.component.css'],
})
export class PersonAddComponent implements OnInit {
  personAddForm: FormGroup;
  @Input()
  person: Person = new Person();

  constructor(
    private formBuilder: FormBuilder,
    private personService: PersonService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createPersonAddForm();
  }

  createPersonAddForm() {
    this.personAddForm = this.formBuilder.group({
      personName: ['', Validators.required],
      personSurname: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      personMail: ['', Validators.required],
    });
  }

  add() {
    if (this.personAddForm.valid) {
      if (this.person.personId == 0) {
        this.personService.add(this.person).subscribe(
          (response) => {
            this.toastrService.success(response.message, 'Kişi Eklendi.');
            this.personService.closeEvent.emit(true);
            this.personService.getPeople();
          },
          (responseError) => {
            if (responseError.error.Errors.length > 0) {
              for (let i = 0; i < responseError.error.Errors.length; i++) {
                this.toastrService.error(
                  responseError.error.Errors[i].ErrorMessage,
                  'Doğrulama Hatası'
                );
              }
            }
          }
        );
      } else {
        this.personService.update(this.person).subscribe(
          (response) => {
            this.toastrService.success(response.message, 'Kişi güncellendi.');
            this.personService.closeEvent.emit(true);
            this.personService.getPeople();
          },
          (responseError) => {
            if (responseError.error.Errors.length > 0) {
              for (let i = 0; i < responseError.error.Errors.length; i++) {
                this.toastrService.error(
                  responseError.error.Errors[i].ErrorMessage,
                  'Doğrulama Hatası'
                );
              }
            }
          }
        );
      }
    } else {
      this.toastrService.error('Formunuz eksik');
    }
  }
}
