import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { Router, RouterModule } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Category } from '../../category/models/category.model';
import { BlogpostService } from '../service/blogpost.service';
import { CategoryService } from '../../category/service/category.service';
import { ImageService } from '../../../shared/components/image-selector/image.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MarkdownComponent } from "ngx-markdown";


@Component({
  selector: 'app-add-blogpost',
  imports: [CommonModule, FormsModule, RouterModule, MarkdownComponent],
  templateUrl: './add-blogpost.component.html',
  styleUrl: './add-blogpost.component.scss'
})
export class AddBlogpostComponent implements OnInit, OnDestroy {
  model: AddBlogPost;
  isImageSelectorVisible : boolean = false;
  categories$?: Observable<Category[]>;

  imageSelectorSubscription?: Subscription;

  constructor(private blogPostService: BlogpostService,
    private router: Router,
    private categoryService: CategoryService,
    // private imageService: ImageService
  ) {
    this.model = {
      title: '',
      shortDescription: '',
      urlHandle: '',
      content: '',
      featuredImageUrl: '',
      author: '',
      isVisible: true,
      publishedDate: new Date(),
      categories: []
    }
  }


  ngOnInit(): void {
     this.categories$ = this.categoryService.getAllCategories();

    //  this.imageSelectorSubscription = this.imageService.onSelectImage()
    //  .subscribe({
    //   next: (selectedImage) => {
    //     this.model.featuredImageUrl = selectedImage.url;
    //     this.closeImageSelector();
    //   }
    //  })

  }

  onFormSubmit(): void {
    console.log(this.model);
    this.blogPostService.createBlogPost(this.model)
    .subscribe({
      next: (response) => {
        this.router.navigateByUrl('/admin/blogpostlist');
      }
    });
  }

  openImageSelector(): void {
    this.isImageSelectorVisible = true;
  }

  closeImageSelector() : void {
    this.isImageSelectorVisible = false;
  }

  ngOnDestroy(): void {
    this.imageSelectorSubscription?.unsubscribe();
  }
}