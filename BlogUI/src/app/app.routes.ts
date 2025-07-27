import { Routes } from '@angular/router';
import { CategoryListComponent } from './core/features/category/category-list/category-list.component';
import { AddcategoryComponent } from './core/features/category/addcategory/addcategory.component';
import { EditCategoryComponent } from './core/features/category/edit-category/edit-category.component';
import { BlogpostListComponent } from './core/features/BlogPost/blogpost-list/blogpost-list.component';
import { AddBlogpostComponent } from './core/features/BlogPost/add-blogpost/add-blogpost.component';
import { EditBlogpostComponent } from './core/features/BlogPost/edit-blogpost/edit-blogpost.component';

export const routes: Routes = [
    {path:'admin/categorylist', component: CategoryListComponent},
    {path:'admin/category/create', component: AddcategoryComponent},
    {path:'admin/categories/:id', component: EditCategoryComponent},
    {path:'admin/blogpostlist', component: BlogpostListComponent},
    {path:'admin/blogpost/create', component: AddBlogpostComponent},
    {path:'admin/blogposts/:id', component: EditBlogpostComponent},

];
