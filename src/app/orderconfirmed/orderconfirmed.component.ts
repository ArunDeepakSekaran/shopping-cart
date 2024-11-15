import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-orderconfirmed',
  templateUrl: './orderconfirmed.component.html',
  styleUrls: ['./orderconfirmed.component.scss']
})
export class OrderconfirmedComponent {

  constructor(
    public dialogRef: MatDialogRef< OrderconfirmedComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(){}

  confirm(){
    this.dialogRef.close('ok')
  }
}
