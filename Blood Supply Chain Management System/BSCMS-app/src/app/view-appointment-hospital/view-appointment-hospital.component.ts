import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { Router, NavigationExtras } from "@angular/router";
import { AlertsService, AlertType, AlertSettings } from '@jaspero/ng-alerts';

@Component({
  selector: 'app-view-appointment-hospital',
  templateUrl: './view-appointment-hospital.component.html',
  styleUrls: ['./view-appointment-hospital.component.scss']
})
export class ViewAppointmentHospitalComponent implements OnInit {

  displayedColumns: string[] = ['donorname', 'donorEmailId', 'donorBloodGroup', 'HospitalName', 'HospitalEmailID', 'ZipCode', 'AppointmentStatus', 'AppointmentDate','buttons'];
  dataSource: any;
  

    senderUserEmailId : String;
    senderUserName : String;
    senderUserBloodGroup : String;
    hospitalName: String;
    hospitalEmailId: String;
    hospitalZipCode: String;
    appointmentStatus : String;
    appointmentDate : String;
    appointmentTime : String;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private _alert: AlertsService) {
    this.route.queryParams.subscribe(params => {
      this.hospitalEmailId = params["hospitalEmailId"];
    });

    this.getAppointment();
  }

  getAppointment() {
    this.http.get('http://localhost:3000/appointments/' + this.hospitalEmailId)
      .subscribe((data) => {
        this.dataSource = data;
        console.log(data);
        if (data[0] === undefined) {
          console.log("Undefine");
        }
      })
  }

  openAlert(type: AlertType, title: string, message: string, options: AlertSettings) {
    this._alert.create(type, title, message, options);
  }

  ngOnInit() {
  }

  confirmAppointment(value)
  {
    this.http.get('http://localhost:3000/appointments/' + value.senderUserEmailId + "/" + value.hospitalEmailId)
      .subscribe((data) => {
        if (data[0].appointmentStatus === 'Pending for Confirmation') {
          const appointmentData = { appointmentStatus: "Appointment Confirmed", appointmentDate : value.appointmentDate};
          this.http.put('http://localhost:3000/appointments/' + value.senderUserEmailId + "/" + value.hospitalEmailId, appointmentData)
            .subscribe((data) => {

              const options = {
                overlay: true,
                overlayClickToClose: true,
                showCloseButton: true,
                duration: 5000
              };
              this.openAlert('success', 'Appointment Confirmed', 'Appointment Confirmed', options);
              this.getAppointment();

            })
        }
        else {
          const options = {
            overlay: true,
            overlayClickToClose: true,
            showCloseButton: true,
            duration: 5000
          };
          this.openAlert('error', 'Cannot Confirm Appointment Yet', 'Cannot Confirm Appointment Yet', options);
          this.getAppointment();
        }
      })
  }

  completeRequest(value)
  {
    this.http.get('http://localhost:3000/appointments/' + value.senderUserEmailId + "/" + value.hospitalEmailId)
      .subscribe((data) => {
        if (data[0].appointmentStatus === 'Appointment Confirmed') {
          const appointmentData = { appointmentStatus: "Request Completed", appointmentDate : value.appointmentDate};
          this.http.put('http://localhost:3000/appointments/' + value.senderUserEmailId + "/" + value.hospitalEmailId, appointmentData)
            .subscribe((data) => {

              const options = {
                overlay: true,
                overlayClickToClose: true,
                showCloseButton: true,
                duration: 5000
              };
              this.openAlert('success', 'Request has been marked as complete', 'Request has been marked as complete', options);
              this.getAppointment();

            })
        }
        else {
          const options = {
            overlay: true,
            overlayClickToClose: true,
            showCloseButton: true,
            duration: 5000
          };
          this.openAlert('error', 'Cannot mark appointment as complete yet', 'Cannot mark appointment as complete yet', options);
          this.getAppointment();
        }
      })
  }

  viewAppointmentHospital() {

    let navigationExtras: NavigationExtras = {
      queryParams: {
        "hospitalEmailId": this.hospitalEmailId,
      }
    }
    this.router.navigate(['/viewAppointmentHospital'], navigationExtras);

  }

  hospitalHomePage() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "hospitalEmailId": this.hospitalEmailId,
      }
    }
    this.router.navigate(['/hospitalhomepage'], navigationExtras);
  }

 appointmentCalenderPage()
 {
  let navigationExtras: NavigationExtras = {
    queryParams: {
      "hospitalEmailId": this.hospitalEmailId,
    }
  }
  this.router.navigate(['/appointmentCalender'], navigationExtras);
 }

}
