import {Component, OnInit, ViewChild} from '@angular/core';
import {SCANNER_FORMAT} from "../../core/utility/emoney-constant";
import {ZXingScannerComponent} from "@zxing/ngx-scanner";
import {FIND_JOB_URL, ICREDIT_URL, SCAN_CODE} from "../../core/utility/navigation-url";
import {Router} from "@angular/router";

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {
  allowedFormats = SCANNER_FORMAT;
  @ViewChild('scanner')
  scanner: ZXingScannerComponent;
  startScan: boolean = false;
  hasCameras = false;
  hasPermission: boolean;
  qrResultString: string;

  availableDeviceList: MediaDeviceInfo[];
  currentlySelectedDevice: MediaDeviceInfo;
  constructor(private _router:Router) { }

  ngOnInit(): void {

    this.init();

  }

  init() {
    this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
      this.hasCameras = true;

      console.log('Devices: ', devices);
      this.availableDeviceList = devices;

      //selects the devices's back camera by default
      for (const device of devices) {
        if (/back|rear|environment/gi.test(device.label)) {
          this.scanner.changeDevice(device);
          this.currentlySelectedDevice = device;
          break;
        }
      }
    });

    this.scanner.camerasNotFound.subscribe((devices: MediaDeviceInfo[]) => {
      console.error('An error has occurred when trying to enumerate your video-stream-enabled devices.');
    });

    this.scanner.permissionResponse.subscribe((answer: boolean) => {
      this.hasPermission = answer;
    });

    this.scanner.askForPermission().then(res => {
      console.log(res);
    });
  }

  onScanSuccess(resultString: string) {
    //console.log('Result: ', resultString);
    this.qrResultString = resultString;
  }

  onDeviceSelectChange(selectedValue: string) {
    //console.log('Selection changed: ', selectedValue);
    this.currentlySelectedDevice = this.scanner.getDeviceById(selectedValue);
  }

  setScanStatus(status: boolean) {
    this.startScan = status;
    if (status == false) {
      this.currentlySelectedDevice = null;
    }
  }

  openScanner() {
    let finalUrl = "/"+ICREDIT_URL+  "/" + SCAN_CODE;
    this._router.navigateByUrl(finalUrl);
  }
}
