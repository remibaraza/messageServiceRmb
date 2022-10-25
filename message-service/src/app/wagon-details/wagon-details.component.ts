import {Component, Inject, Injectable, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-wagon-details',
  templateUrl: './wagon-details.component.html',
  styleUrls: ['./wagon-details.component.scss']
})
export class WagonDetailsComponent implements OnInit {



  constructor(@Inject(MAT_DIALOG_DATA) public data :String[]) { }

  ngOnInit(): void {

  }

}
