import { Component, OnDestroy, OnInit } from '@angular/core';
import { UpdateBlogPost } from '../models/update-blog-post.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../category/service/category.service';
import { BlogpostService } from '../service/blogpost.service';
import { Observable, Subscription } from 'rxjs';
import { Category } from '../../category/models/category.model';
import { BlogPost } from '../models/blog-post.model';
import { ImageService } from '../../../shared/components/image-selector/image.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MarkdownComponent } from 'ngx-markdown';


@Component({
  selector: 'app-edit-blogpost',
  imports: [FormsModule, CommonModule, MarkdownComponent],
  templateUrl: './edit-blogpost.component.html',
  styleUrl: './edit-blogpost.component.scss'
})
export class EditBlogpostComponent implements OnInit, OnDestroy {
  id: string | null = null;
  model?: BlogPost;
  categories$? : Observable<Category[]>;
  selectedCategories?: string[];
  isImageSelectorVisible : boolean = false;


  routeSubscription?: Subscription;
  updateBlogPostSubscription?: Subscription;
  getBlogPostSubscription?: Subscription;
  deleteBlogPostSubscription?: Subscription;
  imageSelectSubscricption?: Subscription;


  constructor(private route: ActivatedRoute,
    private blogPostService: BlogpostService,
    private categoryService: CategoryService,
    private router:Router,
    private imageService: ImageService) {

  }


  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();


    this.routeSubscription = this.route.paramMap.subscribe({
      next: (params:any) => {
        this.id = params.get('id');

        // Get BlogPost From API
        if (this.id) {
          this.getBlogPostSubscription = this.blogPostService.getBlogPostById(this.id).subscribe({
            next: (response:any) => {
              this.model = response;
              this.selectedCategories = response.categories.map((x:any) => x.id);
            }
          });
          ;
        }

        // this.imageSelectSubscricption = this.imageService.onSelectImage()
        // .subscribe({
        //   next: (response:any) => {
        //     if (this.model) {
        //       this.model.featuredImageUrl = response.url;
        //       this.isImageSelectorVisible = false;
        //     }
        //   }
        // })
      }
    });
  }

  onFormSubmit(): void {
    // Convert this model to Request Object
    if (this.model && this.id) {
      var updateBlogPost: UpdateBlogPost = {
        author: this.model.author,
        content: this.model.content,
        shortDescription: this.model.shortDescription,
        featuredImageUrl: this.model.featuredImageUrl,
        isVisible: this.model.isVisible,
        publishedDate: this.model.publishedDate,
        title: this.model.title,
        urlHandle: this.model.urlHandle,
        categories: this.selectedCategories ?? []
      };

      this.updateBlogPostSubscription = this.blogPostService.updateBlogPost(this.id, updateBlogPost)
      .subscribe({
        next: (response:any) => {
          this.router.navigateByUrl('/admin/blogpostlist');
        }
      });
    }

  }

  onDelete(): void {
    if (this.id) {
      // call service and delete blogpost
      this.deleteBlogPostSubscription = this.blogPostService.deleteBlogPost(this.id)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/blogpostlist');
        }
      });
    }
  }

  openImageSelector(): void {
    this.isImageSelectorVisible = true;
  }

  closeImageSelector() : void {
    this.isImageSelectorVisible = false;
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.updateBlogPostSubscription?.unsubscribe();
    this.getBlogPostSubscription?.unsubscribe();
    this.deleteBlogPostSubscription?.unsubscribe();
    this.imageSelectSubscricption?.unsubscribe();
  }
}
