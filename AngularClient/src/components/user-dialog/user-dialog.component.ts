import { Component, OnInit, Inject } from "@angular/core"
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms"
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog"
import type { User } from "../../models/user.model"
import { MatButtonModule } from "@angular/material/button"
// import { MatCardModule } from "@angular/material/card"
import { MatChipsModule } from "@angular/material/chips"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatIconModule } from "@angular/material/icon"
import { MatInputModule } from "@angular/material/input"
import { MatMenuModule } from "@angular/material/menu"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { MatSnackBarModule } from "@angular/material/snack-bar"
import { MatSortModule } from "@angular/material/sort"
import { MatTableModule } from "@angular/material/table"
// import { MatTooltipModule } from "@angular/material/tooltip"
// import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from "@angular/common"

interface DialogData {
  mode: "add" | "edit"
  user?: User
}

// @Component({
//   selector: "app-user-dialog",
//   standalone:true,
//   imports: [CommonModule, FormsModule, ReactiveFormsModule,MatOptionModule,MatSelectModule, MatIconModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule, MatSnackBarModule, MatTableModule, MatSortModule, MatMenuModule, MatChipsModule, MatProgressSpinnerModule],
//   templateUrl: "./user-dialog.component.html",
//   styleUrls: ["./user-dialog.component.css"],
// })
// export class UserDialogComponent implements OnInit {
//   userForm: FormGroup
//   isEditMode: boolean
//   // data: DialogData

//   constructor(
//     private fb: FormBuilder,
//     public dialogRef: MatDialogRef<UserDialogComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: DialogData
//   ) {
//     // this.data = matDialogData
//     this.isEditMode = this.data.mode === "edit"
//     this.userForm = this.fb.group({
//       name: ["", [Validators.required, Validators.minLength(2)]],
//       email: ["", [Validators.required, Validators.email]],
//       status: ["active", [Validators.required]],
//     })
//   }

//   ngOnInit(): void {
//     if (this.isEditMode && this.data.user) {
//       this.userForm.patchValue({
//         name: this.data.user.name,
//         email: this.data.user.email,
//         status: this.data.user.status,
//       })
//     }
//   }

//   onSubmit(): void {
//     if (this.userForm.valid) {
//       this.dialogRef.close(this.userForm.value)
//     }
//   }

//   onCancel(): void {
//     this.dialogRef.close()
//   }

//   getTitle(): string {
//     return this.isEditMode ? "ערוך משתמש" : "הוסף משתמש חדש"
//   }

//   getSubmitButtonText(): string {
//     return this.isEditMode ? "שמור שינויים" : "הוסף משתמש"
//   }
// }

@Component({
  selector: "app-user-dialog",
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatOptionModule, MatSelectModule, MatIconModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule, MatSnackBarModule, MatTableModule, MatSortModule, MatMenuModule, MatChipsModule, MatProgressSpinnerModule],
  templateUrl: "./user-dialog.component.html",
  styleUrls: ["./user-dialog.component.css"],
})
export class UserDialogComponent implements OnInit {
  userForm: FormGroup
  isEditMode: boolean

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.isEditMode = this.data.mode === "edit"
    this.userForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(2)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(4)]],
    })
  }

  ngOnInit(): void {
    if (this.isEditMode && this.data.user) {
      this.userForm.patchValue({
        name: this.data.user.name,
        email: this.data.user.email,
        password: "", // לא טוענים סיסמה קיימת (לרוב היא מוצפנת)
      })
    }
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.value)
    }
  }

  onCancel(): void {
    this.dialogRef.close()
  }

  getTitle(): string {
    return this.isEditMode ? "ערוך משתמש" : "הוסף משתמש חדש"
  }

  getSubmitButtonText(): string {
    return this.isEditMode ? "שמור שינויים" : "הוסף משתמש"
  }
}