import { AuthService } from './../core/services/auth.service';
import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';


@Directive({ selector: '[appShowAuthed]' })
export class ShowAuthedDirective implements OnInit {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {}

  condition: boolean;

  ngOnInit() {
    if (this.authService.isLoggedIn() && this.condition || !this.authService.isLoggedIn() && !this.condition) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  @Input() set appShowAuthed(condition: boolean) {
    this.condition = condition;
  }

}
