import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEjemplo } from '../ejemplo.model';

@Component({
  selector: 'jhi-ejemplo-detail',
  templateUrl: './ejemplo-detail.component.html',
})
export class EjemploDetailComponent implements OnInit {
  ejemplo: IEjemplo | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ejemplo }) => {
      this.ejemplo = ejemplo;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
