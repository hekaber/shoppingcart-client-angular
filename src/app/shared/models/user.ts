export class User {
  public email: string = "";
  public password: string = ""
  public firstName: string = "";
  public lastName: string = "";
  public userName: string = "";

  constructor(email, userName, password, firstName, lastName) {
    this.email = email;
    this.userName = userName;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
