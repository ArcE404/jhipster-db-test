import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICategory, NewCategory } from '../category.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICategory for edit and NewCategoryFormGroupInput for create.
 */
type CategoryFormGroupInput = ICategory | PartialWithRequiredKeyOf<NewCategory>;

type CategoryFormDefaults = Pick<NewCategory, 'id' | 'products'>;

type CategoryFormGroupContent = {
  id: FormControl<ICategory['id'] | NewCategory['id']>;
  description: FormControl<ICategory['description']>;
  sortOrder: FormControl<ICategory['sortOrder']>;
  dateAdded: FormControl<ICategory['dateAdded']>;
  dateModified: FormControl<ICategory['dateModified']>;
  status: FormControl<ICategory['status']>;
  genero: FormControl<ICategory['genero']>;
  parent: FormControl<ICategory['parent']>;
  products: FormControl<ICategory['products']>;
};

export type CategoryFormGroup = FormGroup<CategoryFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CategoryFormService {
  createCategoryFormGroup(category: CategoryFormGroupInput = { id: null }): CategoryFormGroup {
    const categoryRawValue = {
      ...this.getFormDefaults(),
      ...category,
    };
    return new FormGroup<CategoryFormGroupContent>({
      id: new FormControl(
        { value: categoryRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      description: new FormControl(categoryRawValue.description, {
        validators: [Validators.required, Validators.minLength(8), Validators.maxLength(150)],
      }),
      sortOrder: new FormControl(categoryRawValue.sortOrder, {
        validators: [Validators.min(0)],
      }),
      dateAdded: new FormControl(categoryRawValue.dateAdded),
      dateModified: new FormControl(categoryRawValue.dateModified),
      status: new FormControl(categoryRawValue.status),
      genero: new FormControl(categoryRawValue.genero),
      parent: new FormControl(categoryRawValue.parent),
      products: new FormControl(categoryRawValue.products ?? []),
    });
  }

  getCategory(form: CategoryFormGroup): ICategory | NewCategory {
    return form.getRawValue() as ICategory | NewCategory;
  }

  resetForm(form: CategoryFormGroup, category: CategoryFormGroupInput): void {
    const categoryRawValue = { ...this.getFormDefaults(), ...category };
    form.reset(
      {
        ...categoryRawValue,
        id: { value: categoryRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CategoryFormDefaults {
    return {
      id: null,
      products: [],
    };
  }
}
