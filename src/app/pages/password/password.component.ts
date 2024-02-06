import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { KeyService } from '../../service/key.service';
import { StorageService } from '../../service/storage.service';
import { ToastService } from '../../service/toast.service';
import { MessageService } from '../../service/message.service';
import { ChangePassword } from '../../models/user/change_user_password.model';

import { ChangePasswords } from './password.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';



@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  model: ChangePassword = new ChangePassword(); // Initialize the model
  userId!: string;
  form!: FormGroup;

  busy: boolean = true;

  constructor(
    private storageService: StorageService,
    private passwordService: ChangePasswords,
    private router: Router,
    private keyService: KeyService,
    private toastService: ToastService,
    private messageService: MessageService,
    private location: Location,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,


    
  ) {
   
  }

  

  ngOnInit(): void {
    this.busy = true;
    this.userId = this.storageService.getData(this.keyService.USERID_KEY);
    this.busy = false;

    this.form = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  save() {
    // Check if the form is valid
    if (this.form.valid) {
      // Check if new password and confirm password match
      if (this.form.value.newPassword === this.form.value.confirmPassword) {
        // Check if the current password is correct (you may need to implement this logic)
        if (this.isCurrentPasswordCorrect()) {
          // Create a ChangePassword object
          const newPasswordData: ChangePassword = {
            userId: this.userId, // Set the user ID here
            oldPassword: this.form.value.oldPassword,
            newPassword: this.form.value.newPassword,
            confirmPassword: this.form.value.confirmPassword,
          };

          // Call the service to change the password
          this.passwordService.edit(newPasswordData).subscribe(
            (response) => {
              // console.log('Password changed successfully:', response);
              this.toastService.success('Password changed successfully');
              this.router.navigate(['/page/login']);
            },
            (error) => {
              // Handle the error response
              // console.error('Error changing password:', error);
                         this.toastService.error('Error changing password');

            }
          );
        } else {
          // console.error('Current password is incorrect.');
          this.toastService.error('Current password is incorrect');

        }
      } else {
        // Passwords do not match, handle accordingly (show an error message, for example)
        // console.error('New password and confirm password do not match.');
        this.toastService.error('New password and confirm password do not match.');

      }
    } else {
      // Form is invalid, handle accordingly (show an error message, for example)
      // console.error('Form is invalid. Please fill in all the required fields.');
      this.toastService.error('Form is invalid. Please fill in all the required fields.');

    }
    this.cdr.detectChanges();
  }

  // Placeholder method to check if the current password is correct
  isCurrentPasswordCorrect(): boolean {
    // Implement your logic to check if the current password is correct
    // You might want to call a service or API endpoint for this validation
    // Return true if correct, false otherwise
    return true; // Placeholder value, replace with your implementation
   

  }
  
  goBack() {
    this.location.back();
  }
  
}
