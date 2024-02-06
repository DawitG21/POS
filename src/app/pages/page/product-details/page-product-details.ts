import { Component, ViewEncapsulation } from '@angular/core';
import { Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-product-details',
  templateUrl: './page-product-details.html',
  styleUrls: [ './page-product-details.css' ],
  encapsulation: ViewEncapsulation.None
})

export class ProductDetailsPage {
	sizeTagsValue = ['XL', 'S'];
  sizeTagsValidator = Validators.required;
  
	colorTagsValue = ['Black'];
  colorTagsValidator = Validators.required;
  
	materialTagsValue = [];
  materialTagsValidator = Validators.required;
  
	tagsInputValue = ['Laptop', 'Apple'];
  tagsInputValidator = Validators.required;
}
