import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { Router, NavigationExtras } from "@angular/router";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { AlertsService, AlertType, AlertSettings } from '@jaspero/ng-alerts';

@Component({
  selector: 'app-view-appointment-user',
  templateUrl: './view-appointment-user.component.html',
  styleUrls: ['./view-appointment-user.component.scss']
})
export class ViewAppointmentUserComponent implements OnInit {

  animal: string;
  name: string;

  emailId: any;
  displayedColumns: string[] = ['donorname', 'donorEmailId', 'donorBloodGroup', 'HospitalName', 'HospitalEmailID', 'ZipCode', 'AppointmentStatus', 'AppointmentDate', 'buttons'];
  dataSource: any;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private dialog: MatDialog, private _alert: AlertsService) {

    this.route.queryParams.subscribe(params => {
      this.emailId = params["emailId"];
    });
    this.getAppointment();
  }

  openAlert(type: AlertType, title: string, message: string, options: AlertSettings) {
    this._alert.create(type, title, message, options);
  }

  openDialog(element): void {
    console.log(element.senderUserEmailId)
    const dialogRef = this.dialog.open(ScheduleAppointment, {
      width: '400px', height: '400px',
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getAppointment();
    });
  }

  getAppointment() {
    this.http.get('http://localhost:3000/appointments/' + this.emailId)
      .subscribe((data) => {
        this.dataSource = data;
        console.log(data);
        if (data[0] === undefined) {
          console.log("Undefine");
        }
      })
  }

  userHomePage()
  {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "emailId": this.emailId,
      }
    }
    this.router.navigate(['/userhomepage'], navigationExtras);
  }
  
  updateProfilePage()
  {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "emailId": this.emailId,
      }
    }
    this.router.navigate(['/updateprofile'], navigationExtras);
  }

  searchDonorPage() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "emailId": this.emailId,
      }
    }
    this.router.navigate(['/searchdonar'], navigationExtras);
  }

  searchBloodBankPage() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "emailId": this.emailId,
      }
    }
    this.router.navigate(['/searchbloodbank'], navigationExtras);
  }

  viewAppointmentUser()
  {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "emailId": this.emailId,
      }
    }
    this.router.navigate(['/viewAppointmentUser'], navigationExtras);
  }

  ngOnInit() {
  }

}

@Component({
  selector: 'scheduleAppointment',
  templateUrl: './scheduleAppointment.html',
})
export class ScheduleAppointment {

  appointmentDate: String = "";
  constructor(
    public dialogRef: MatDialogRef<ScheduleAppointment>,
    @Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient, private _alert: AlertsService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openAlert(type: AlertType, title: string, message: string, options: AlertSettings) {
    this._alert.create(type, title, message, options);
  }

  confirmAppointment() {
    console.log("Fron confirm appointment");
    this.http.get('http://localhost:3000/appointments/' + this.data.senderUserEmailId + "/" + this.data.hospitalEmailId)
      .subscribe((data) => {
        if (data[0].appointmentStatus === 'Approved') {
          const appointmentData = { appointmentStatus: "Pending for Confirmation", appointmentDate: this.appointmentDate };
          this.http.put('http://localhost:3000/appointments/' + this.data.senderUserEmailId + "/" + this.data.hospitalEmailId, appointmentData)
            .subscribe((data) => {

              const options = {
                overlay: true,
                overlayClickToClose: true,
                showCloseButton: true,
                duration: 5000
              };
              this.openAlert('success', 'Appointment confirmed, Waiting for confirmation from hospital', 'Appointment confirmed, Waiting for confirmation from hospital', options);
              this.dialogRef.close();

            })
        }
        else {
          const options = {
            overlay: true,
            overlayClickToClose: true,
            showCloseButton: true,
            duration: 5000
          };
          this.openAlert('error', 'Can not book appointment Yet', 'Can not book appointment Yet', options);
          this.dialogRef.close();
        }
      })
    console.log(this.appointmentDate);
    console.log(this.data.senderUserEmailId);
  }

}