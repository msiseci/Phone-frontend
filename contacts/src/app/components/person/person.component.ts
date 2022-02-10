import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Person } from 'src/app/models/person';
import { PersonService } from 'src/app/services/person.service';
import { ToastrService } from 'ngx-toastr';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonAddComponent } from '../person-add/person-add.component';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
})
export class PersonComponent implements OnInit {
  @ViewChild('editPage', { static: true })
  private editPage!: PersonAddComponent;
  firstevent = false;
  filterText: '';
  closeResult = '';
  isAdd: boolean;
  person: Person;

  // personResponseModel:PersonResponseModel={
  //   data:this.people,
  //   message:"",
  //   success:true
  // };
  constructor(
    public personService: PersonService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.personService.getPeople();
    this.personService.closeEvent.subscribe((data) => {
      this.modalService.dismissAll();
    });
  }

  // editToPerson(person:Person){
  //   this.toastrService.success("Kişi güncellendi",person.personName)
  // }
  open(content: any) {
    this.person = new Person();
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  update(content: any, personId: number) {
    var updateModel = this.personService.people.filter(
      (x) => x.personId == personId
    );

    if (updateModel.length > 0) {
      this.person = updateModel[0];
      //debugger;
      this.modalService
        .open(content, { ariaLabelledBy: 'modal-basic-title' })
        .result.then(
          (result) => {
            this.closeResult = `Closed with: ${result}`;
          },
          (reason: any) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          }
        );
    }
  }

  delete(id: number) {
    this.personService.delete(id).subscribe(
      (response) => {
        this.toastrService.success(response.message, 'Kişi silindi.');
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

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
