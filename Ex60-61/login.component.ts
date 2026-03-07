import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  name: string = '';
  password: string = '';
  message: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // Read cookie when component initializes
    this.readCookie();
  }

  login() {
    // Create login request
    const loginData = {
      username: this.name,
      password: this.password
    };

    this.http.post('http://localhost:3002/auth/login', loginData, { withCredentials: true }).subscribe(
      (response: any) => {
        if (response.success) {
          this.message = 'Login successful! Cookie saved.';
          // Cookie will be automatically saved by browser
        } else {
          this.message = 'Login failed: ' + response.message;
        }
      },
      (error) => {
        this.message = 'Login error: ' + (error.error?.message || error.statusText);
      }
    );
  }

  register() {
    // Create registration request
    const registerData = {
      name: this.name,
      password: this.password
    };

    this.http.post('http://localhost:3002/auth/register', registerData, { withCredentials: true }).subscribe(
      (response: any) => {
        if (response.success) {
          this.message = 'Registration successful! Cookie saved.';
          // Cookie will be automatically saved by browser
        } else {
          this.message = 'Registration failed: ' + response.message;
        }
      },
      (error) => {
        this.message = 'Registration error: ' + (error.error?.message || error.statusText);
      }
    );
  }

  readCookie() {
    // Read cookies from server
    this.http.get('http://localhost:3002/read-cookie', { withCredentials: true }).subscribe(
      (cookies: any) => {
        if (cookies.username) {
          this.name = cookies.username;
          this.password = cookies.password || '';
        }
      },
      (error) => {
        console.log('No cookies found');
      }
    );
  }

  logout() {
    this.http.get('http://localhost:3002/clear-cookie', { withCredentials: true }).subscribe(
      (response: any) => {
        this.name = '';
        this.password = '';
        this.message = 'Logout successful!';
      }
    );
  }
}
