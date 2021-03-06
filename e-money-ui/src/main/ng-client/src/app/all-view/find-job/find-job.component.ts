import {Component, OnInit, ViewChild} from '@angular/core';
import {JobService} from "../app-services/job.service";
import {JobModel} from "../models/job.model";
import {ResponseModel} from "../../core/lib/model/response.model";
import {Router} from "@angular/router";
import {MatDialog, MatSnackBar, MatTabGroup} from "@angular/material";
import {ConfirmDialogComponent} from "../../core/lib/components/confirm-dialog/confirm-dialog.component";
import {JobTransactionModel} from "../models/job-transaction.model";
import {SessionStorageService} from "../../core/lib/services/session-storage.service";


@Component({
  selector: 'app-find-job',
  templateUrl: './find-job.component.html',
  styleUrls: ['./find-job.component.scss']
})
export class FindJobComponent implements OnInit {
  @ViewChild("matTabGroup")
    matTabGroup: MatTabGroup
  lat: number = 61.1695977;
  lng: number = 28.7645463;
  jobList: JobModel[];
  finishDate = 'April 1, 2019 00:33';
  isCustomTemplate = true;
  token: string;
  days;
  hours;
  minutes;
  seconds;
  backgroundColor = 'red';
  textColor = 'black';
  date = new Date('2019-04-26T00:00:00');

  onDaysChanged(days, job: JobModel) {
    job.days = days;
  }

  onHoursChanged(hours, job: JobModel) {
    job.hours = hours;
  }

  onMinutesChanged(minutes, job: JobModel) {
    job.minutes = minutes;
  }

  onSecondsChanged(seconds, job: JobModel) {
    job.seconds = seconds;
  }

  constructor(private _jobService: JobService,
              private _router: Router,
              private _dialog: MatDialog,
              private _snackBar: MatSnackBar,
              private _sessionStorageService: SessionStorageService
  ) {
    this.jobList = [];
  }

  ngOnInit() {
    this._jobService.getActiveJobList().then((res: ResponseModel) => {
      if (res.responseStatus) {
        this.jobList = res.result;
      } else {
        this.jobList = [];
      }
    });
    this.token = this._sessionStorageService.getToken();
  }
  markerClick(e, job: JobModel) {

    e.preventDefault();
    this.matTabGroup.selectedIndex = 1;
    job.checked=true;
  }

  confirmApply(job: JobModel) {
    this.openDialog(job);
  }

  openDialog(job: JobModel): void {
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {title: "Confirm", content: "Do you want to apply for this Job?"}
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.applyJob(job);
      }

    });
  }

  applyJob(job: JobModel) {
    let jobTransactionModel: JobTransactionModel = new JobTransactionModel();
    jobTransactionModel.jobId = job.id;
    this._jobService.apply(jobTransactionModel).then((res: ResponseModel) => {
      if (res.responseStatus) {
        job.jobStatus = "APPLIED";
      }
      this._snackBar.open(res.message, "OK", {
        duration: 6000,
        verticalPosition: 'top'
      });
    });
  }

  onPanelOpen(job: JobModel) {
    this._jobService.verifyAppliedJob(job.id).then((res: ResponseModel) => {
      job.jobStatus = res.responseStatus ? res.result['status'] : "";
    });
  }

  onClosed(job: JobModel){
    job.checked = false;
  }



}
