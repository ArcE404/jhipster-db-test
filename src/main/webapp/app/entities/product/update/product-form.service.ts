import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IProduct, NewProduct } from '../product.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IProduct for edit and NewProductFormGroupInput for create.
 */
type ProductFormGroupInput = IProduct | PartialWithRequiredKeyOf<NewProduct>;

type ProductFormDefaults = Pick<NewProduct, 'id' | 'categories'>;

type ProductFormGroupContent = {
  id: FormControl<IProduct['id'] | NewProduct['id']>;
  title: FormControl<IProduct['title']>;
  keywords: FormControl<IProduct['keywords']>;
  description: FormControl<IProduct['description']>;
  rating: FormControl<IProduct['rating']>;
  dateAdded: FormControl<IProduct['dateAdded']>;
  dateModified: FormControl<IProduct['dateModified']>;
  price: FormControl<IProduct['price']>;
  categories: FormControl<IProduct['categories']>;
};

export type ProductFormGroup = FormGroup<ProductFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ProductFormService {
  createProductFormGroup(product: ProductFormGroupInput = { id: null }): ProductFormGroup {
    const productRawValue = {
      ...this.getFormDefaults(),
      ...product,
    };
    return new FormGroup<ProductFormGroupContent>({
      id: new FormControl(
        { value: productRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      title: new FormControl(productRawValue.title, {
        validators: [Validators.required],
      }),
      keywords: new FormControl(productRawValue.keywords, {
        validators: [Validators.required],
      }),
      description: new FormControl(productRawValue.description, {
        validators: [Validators.required],
      }),
      rating: new FormControl(productRawValue.rating, {
        validators: [Validators.min(0)],
      }),
      dateAdded: new FormControl(productRawValue.dateAdded),
      dateModified: new FormControl(productRawValue.dateModified),
      price: new FormControl(productRawValue.price, {
        validators: [Validators.min(0)],
      }),
      categories: new FormControl(productRawValue.categories ?? []),
    });
  }

  getProduct(form: ProductFormGroup): IProduct | NewProduct {
    return form.getRawValue() as IProduct | NewProduct;
  }

  resetForm(form: ProductFormGroup, product: ProductFormGroupInput): void {
    const productRawValue = { ...this.getFormDefaults(), ...product };
    form.reset(
      {
        ...productRawValue,
        id: { value: productRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ProductFormDefaults {
    return {
      id: null,
      categories: [],
    };
  }
}
