import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-display',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './display.component.html',
  styleUrl: './display.component.css'
})
export class DisplayComponent implements OnInit{
  httpClient = inject(HttpClient);
  data: any= [];

  ngOnInit(): void {
    this.fetchData();
  }
  fetchData() {
    this.httpClient.get('http://localhost:5000/inventory/api/v1.0/books').subscribe((data:any) => {
      console.log('data:',data);
      console.log('books:',data.books);

      this.data = data.books;
    })
  }
}
