import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import{HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb:FormBuilder,private http:HttpClient) { }
  readonly BaseURI ="http://localhost:51458/api" ;
  formModel=this.fb.group({
  UserName:['',Validators.required],
  Email:['',Validators.email],
  FullName:[''],
  Passwords:this.fb.group({
    Password:['',[Validators.required,Validators.minLength(4)] ],
    ConfirmPassword:['',Validators.required]
  },{Validator:this.comparePasswords})
}) ; 
comparePasswords(fb:FormGroup){
  debugger
let confirmPswrdCtrl=fb.get('ConfirmPassword');
if (confirmPswrdCtrl.errors==null || 'passwordMismatch' in confirmPswrdCtrl.errors)
{
  if(fb.get('Password').value !=confirmPswrdCtrl.value)
  confirmPswrdCtrl.setErrors({passwordMismatch:true});
  else
  confirmPswrdCtrl.setErrors(null);
}
 
}
register(){
  var body={
    UserName:this.formModel.value.UserName,
    Email:this.formModel.value.Email,
    FullName:this.formModel.value.FullName,
    Password:this.formModel.value.Passwords.Password,
   // ConfirmPassword:this.formModel.value.ConfirmPassword
  };
return this.http.post(this.BaseURI + '/ApplicationUser/Register',body);
}
}
