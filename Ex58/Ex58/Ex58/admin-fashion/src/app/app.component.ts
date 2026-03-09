import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="app-container">
      <header class="app-header">
        <h1>👗 Admin Fashion</h1>
        <p>Manage Fashion Items & Styles</p>
      </header>
      <main class="app-main">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    
    .app-header {
      background: rgba(0,0,0,0.1);
      padding: 30px 20px;
      text-align: center;
      color: white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    }
    
    .app-header h1 {
      margin: 0;
      font-size: 2.5em;
      font-weight: bold;
    }
    
    .app-header p {
      margin: 8px 0 0 0;
      font-size: 1.1em;
      opacity: 0.9;
    }
    
    .app-main {
      padding: 30px 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
  `]
})
export class AppComponent {
  title = 'admin-fashion';
}