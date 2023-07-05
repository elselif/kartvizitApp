import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Card } from 'src/app/models/card';
import { Inject, Injectable } from '@angular/core';
import { CardService } from 'src/app/services/card.service';
import {SnackbarService} from '../../services/snackbar.service';


@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.scss']
})
export class CardModalComponent implements OnInit {

  cardForm!: FormGroup;
  showSpinner: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<CardModalComponent>,
    private fb: FormBuilder,
    private cardService : CardService,
    private _snackBar: MatSnackBar,
    private snackbarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data:Card
  ) { }

  ngOnInit(): void {

    this.cardForm = this.fb.group({
      name: '',
      title: [this.data?.name || '', Validators.required],
      phone:  [this.data?.phone || '', Validators.required],
      email:  [this.data?.email || '', Validators.email],
      address : [this.data?.address || '', Validators.maxLength(255)],
    })
  }

  addCard(): void {
    this.showSpinner = true;
    this.cardService.addCard(this.cardForm.value)
      .subscribe((res:any) => {
        console.log(res);
        this._snackBar.open(res|| 'Kartvizit başarıyla eklendi', '' , {
          duration:4000,
        });
        this.cardService.getCards();
        this.showSpinner=false;
        this.dialogRef.close();
      });
   }

   updateCard(): void {
    this.showSpinner = true;
    this.cardService.updateCard(this.cardForm.value, this.data.id)
      .subscribe((res:any) => {
        console.log(res);
        this._snackBar.open(res || 'Kartvizit başarıyla güncellendi ' , '' , {
          duration:4000,
        });
        this.cardService.getCards();
        this.showSpinner=false;

        this.dialogRef.close();
      });
   }

   deleteCard(): void {
    this.showSpinner = true;
    this.cardService.deleteCard(this.data.id)
      .subscribe((res: any) => {
        this.getSuccess(res || 'Kartvizit başarıyla silindi.');
      }, (err: any) => {
        this.getError(err.message || 'Kartvizit silinirken bir sorun oluştu');
      });
  }

  getSuccess(message: string): void {
    this.snackbarService.createSnackbar('success', message);
    this.cardService.getCards();
    this.showSpinner = false;
    this.dialogRef.close();
  }

  getError(message: string): void {
    this.snackbarService.createSnackbar('error', message);
    this.showSpinner = false;
  }


}
