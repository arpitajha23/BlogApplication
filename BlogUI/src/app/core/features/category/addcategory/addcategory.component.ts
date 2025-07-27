import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { CategoryService } from '../service/category.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-addcategory',
  imports: [CommonModule, FormsModule],
  templateUrl: './addcategory.component.html',
  styleUrl: './addcategory.component.scss'
})
  

export class AddcategoryComponent implements OnDestroy {

  model: AddCategoryRequest;
  private addcategorysubscription?: Subscription;

  constructor( private categoryService: CategoryService,
               private router: Router) {
    this.model = {
      name: '', 
      urlHandle: ''
    };
  }
 

onSubmit(){
 this.addcategorysubscription = this.categoryService.addCategory(this.model)
    .subscribe({
      next: (response) => {
        this.router.navigateByUrl('/admin/categorylist');
      }
    })
  }

   ngOnDestroy(): void {
     this.addcategorysubscription?.unsubscribe();
   }
}

