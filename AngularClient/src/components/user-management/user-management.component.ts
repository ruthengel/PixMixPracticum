import { Component, type OnInit, ViewChild } from "@angular/core"
import { MatTableDataSource, MatTableModule } from "@angular/material/table"
import { MatPaginator } from "@angular/material/paginator"
import { MatSort, MatSortModule } from "@angular/material/sort"
import { MatDialog, MatDialogModule } from "@angular/material/dialog"
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar"
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms"
import { debounceTime, distinctUntilChanged } from "rxjs/operators"
import type { User } from "../../models/user.model"
import { UserService } from "../../services/user-service/user.service"
// import { UserDialogComponent } from "../user-dialog/user-dialog.component"
import { MatButtonModule } from "@angular/material/button"
import { MatCardModule } from "@angular/material/card"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatIconModule } from "@angular/material/icon"
import { MatInputModule } from "@angular/material/input"
import { MatMenuModule } from "@angular/material/menu"
// import { BrowserModule } from "@angular/platform-browser"
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { log } from "console"
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@Component({
  selector: "app-user-management",
  standalone: true,
  imports: [ FormsModule, ReactiveFormsModule,MatPaginator, MatCardModule, MatIconModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTooltipModule, MatDialogModule, MatSnackBarModule, MatTableModule, MatSortModule, MatMenuModule, MatChipsModule, MatProgressSpinnerModule],
  templateUrl: "./user-management.component.html",
  styleUrls: ["./user-management.component.css"],
})
export class UserManagementComponent implements OnInit {
  displayedColumns: string[] = ["name", "email", "joinDate", "status", "totalImages", "actions"]
  dataSource = new MatTableDataSource<User>()
  isLoading = false
  searchControl = new FormControl("")

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  constructor(private userService: UserService, private dialog: MatDialog, private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.loadUsers()
    this.setupSearch()
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }

  setupSearch(): void {
    this.searchControl.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe((searchTerm) => {
      this.loadUsers(searchTerm || "")
    })
  }

  loadUsers(search?: string): void {
    this.isLoading = true
    this.userService.getUsers(search).subscribe({
      next: (response) => {
        console.log("response:");       
        console.log(response);       
        console.log("response.users:");       
        console.log(response.users);       
        this.dataSource.data = response.users
        this.isLoading = false
      },
      error: (error) => {
        this.snackBar.open("שגיאה בטעינת המשתמשים", "סגור", {
          duration: 3000,
          panelClass: ["error-snackbar"],
        })
        this.isLoading = false
      },
    })
  }

  openAddDialog(): void {
    // const dialogRef = this.dialog.open(UserDialogComponent, {
    //   width: "500px",
    //   data: { mode: "add" },
    // })

    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result) {
    //     this.userService.createUser(result).subscribe({
    //       next: (response) => {
    //         this.loadUsers()
    //         this.snackBar.open(`המשתמש ${response.user.name} נוסף בהצלחה`, "סגור", {
    //           duration: 3000,
    //           panelClass: ["success-snackbar"],
    //         })
    //       },
    //       error: () => {
    //         this.snackBar.open("שגיאה בהוספת המשתמש", "סגור", {
    //           duration: 3000,
    //           panelClass: ["error-snackbar"],
    //         })
    //       },
    //     })
    //   }
    // })
  }

  openEditDialog(user: User): void {
    // const dialogRef = this.dialog.open(UserDialogComponent, {
    //   width: "500px",
    //   data: { mode: "edit", user },
    // })

    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result) {
    //     this.userService.updateUser(user.id, result).subscribe({
    //       next: (response) => {
    //         this.loadUsers()
    //         this.snackBar.open(`המשתמש ${response.user.name} עודכן בהצלחה`, "סגור", {
    //           duration: 3000,
    //           panelClass: ["success-snackbar"],
    //         })
    //       },
    //       error: () => {
    //         this.snackBar.open("שגיאה בעדכון המשתמש", "סגור", {
    //           duration: 3000,
    //           panelClass: ["error-snackbar"],
    //         })
    //       },
    //     })
    //   }
    // })
  }

  deleteUser(user: User): void {
    if (confirm(`האם אתה בטוח שברצונך למחוק את המשתמש ${user.name}?`)) {
      this.userService.deleteUser(user.id).subscribe({
        next: (response) => {
          this.loadUsers()
          this.snackBar.open(`המשתמש ${response.user.name} נמחק בהצלחה`, "סגור", {
            duration: 3000,
            panelClass: ["success-snackbar"],
          })
        },
        error: () => {
          this.snackBar.open("שגיאה במחיקת המשתמש", "סגור", {
            duration: 3000,
            panelClass: ["error-snackbar"],
          })
        },
      })
    }
  }

  getStatusColor(status: string): string {
    return status === "active" ? "primary" : "warn"
  }

  getStatusText(status: string): string {
    return status === "active" ? "פעיל" : "לא פעיל"
  }
}
