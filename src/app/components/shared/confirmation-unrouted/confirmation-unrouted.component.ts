import { Component, Output, EventEmitter, Input, Injectable} from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';


@Component({
  selector: 'app-confirmation-unrouted',
  templateUrl: './confirmation-unrouted.component.html',
  styleUrls: ['./confirmation-unrouted.component.css'],
})

@Injectable({
  providedIn: 'root'
}
)
export class ConfirmationUnroutedComponent {

  @Input() message: string | undefined;
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  
  constructor(
    private ref: DynamicDialogRef
  ) { }

  confirmAction() {
    this.confirm.emit();
    this.ref.close(true);
  }

  cancelAction() {
    this.cancel.emit();
    this.ref.close(false);
  }


 


}
