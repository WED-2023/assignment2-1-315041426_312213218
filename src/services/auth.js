// src/services/auth.js

  let registeredUsers = [];

  export function mockLogin(credentials, success = true) {
    // Check if already logged in
    if (!success) {
      throw { status: 409, response: { data: { message: "A user is already logged in", success: false } } };
    }

    // If all checks pass, return a success message
    return { status: 200, response: { data: { message: "login succeeded", success: true}} };
  }
  

  export function mockRegister(userDetails, success = true) {

    if (!success) {
      throw { status: 409, response: { data: { message: "Username taken", success: false } } };
    }
  
    return { status: 200, response: { data: { message: "user created", success: true}} };
  }
  


  export function mockLogout() {
    return { status: 200, response: { data: { message: "logout succeeded", success: true}} };

  }


  // export function mockCheckUsernameExists(username) {
  //   return registeredUsers.some(user => user.username === username);
  // }

  // export function mockRegister(userDetails) {
  //   registeredUsers.push(userDetails);
  //   return { success: true };
  // }
  
  export function mockCheckUsernameExists(username) {
    return registeredUsers.some(user => user.username === username);
  }
  
  // export function mockLogin(username, password) {
  //   const user = registeredUsers.find(user => user.username === username && user.password === password);
  //   if (user) {
  //     return { success: true };
  //   } else {
  //     return { success: false, message: "Invalid username or password" };
  //   }
  // }