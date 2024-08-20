import { Component } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.css']
})
export class ItemCreateComponent {
  name = '';
  description = '';
  price = 0;

  constructor(private itemService: ItemService, private router: Router) { }

  createItem() {
    const item = { name: this.name, description: this.description, price: this.price };
    this.itemService.createItem(item).subscribe(() => {
      this.router.navigate(['/items']);
    });
  }
}
