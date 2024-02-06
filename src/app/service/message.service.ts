import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MessageService {
    INVALID_EMAIL = 'Invalid email, Please put a valid email';
    LoginError = 'Invalid email or Password';
    LoginSuccess = 'Login Successful';


   

    operationSuccesful = 'Operation Succesful';
    dataNotFound = 'No data available';
    mandatoryFields = 'The fields marked with asterik * are mandatory';
    serverError = 'Oops! Something went wrong.';
}