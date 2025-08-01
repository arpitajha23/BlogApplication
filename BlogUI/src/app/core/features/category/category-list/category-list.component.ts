import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category.model';
import { Observable } from 'rxjs';
import { CategoryService } from '../service/category.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-category-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent implements OnInit {
  categories$?: Observable<Category[]>;
  totalCount?: number;
  list: number[] = [];
  pageNumber = 1;
  pageSize = 3;

  constructor(private categoryService: CategoryService) {
  }
  
  ngOnInit(): void {
    this.categoryService.getCategoryCount()
      .subscribe({
        next: (value) => {
          this.totalCount = value;
          this.list = new Array(Math.ceil(value / this.pageSize))

          this.categories$ = this.categoryService.getAllCategories(
            undefined,
            undefined,
            undefined,
            this.pageNumber,
            this.pageSize
          );
        }
      })
  }

  onSearch(query: string) {
    this.categories$ = this.categoryService.getAllCategories(query);
  }

  sort(sortBy: string, sortDirection: string) {
    this.categories$ = this.categoryService.getAllCategories(undefined, sortBy, sortDirection);
  }

  getPage(pageNumber: number) {
    this.pageNumber = pageNumber;

    this.categories$ = this.categoryService.getAllCategories(
      undefined,
      undefined,
      undefined,
      this.pageNumber,
      this.pageSize
    );
  }


  getNextPage() {
    if (this.pageNumber + 1 > this.list.length) {
      return;
    }

    this.pageNumber += 1;
    this.categories$ = this.categoryService.getAllCategories(
      undefined,
      undefined,
      undefined,
      this.pageNumber,
      this.pageSize
    );
  }

  getPrevPage() {
    if (this.pageNumber - 1 < 1) {
      return;
    }

    this.pageNumber -= 1;
    this.categories$ = this.categoryService.getAllCategories(
      undefined,
      undefined,
      undefined,
      this.pageNumber,
      this.pageSize
    );
  }
}
