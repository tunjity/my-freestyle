import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/country.service';

interface ApiResponse<T> {
    status: string;
    message: string;
    data: T;
  }
  
  interface Item {
    // Define the properties of Item here
    
    name: string;
    createdAt: string;
    // Add other properties as per your API response
  }
@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})


export class TablesComponent implements OnInit {
    items: any[] = [];
    newItem: any = {
        name: '',
        
        // Add other fields if necessary
      };
  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
      this.itemService.getItems().subscribe((response: ApiResponse<Item[]>)=>{
        console.log(response);
        this.items = response.data;
      }); 

      
  }
  onSubmit(): void {
    this.itemService.addItem(this.newItem).subscribe(response => {
      console.log('Item added successfully', response);
      this.items.push(response.data);  // Add the newly added item to the list
      this.newItem = { name: '' };  // Reset the form
    });
  }
  getHeaders(): string[] {
    if (this.items.length > 0) {
        return Object.keys(this.items[0]);
    }
    return [];
}

getKeys(item: any): string[] {
    return Object.keys(item);
}
}
