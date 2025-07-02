import { Routes } from '@angular/router';
import { CategoryListComponent } from './core/features/category/category-list/category-list.component';
import { AddcategoryComponent } from './core/features/category/addcategory/addcategory.component';

export const routes: Routes = [
    {path:'admin/categorylist', component: CategoryListComponent},
    {path:'admin/category/create', component: AddcategoryComponent},
];
