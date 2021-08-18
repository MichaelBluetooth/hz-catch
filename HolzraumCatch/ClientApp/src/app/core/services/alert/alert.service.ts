import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
} from "@angular/core";
import { AlertComponent } from "../../components/alert/alert.component";


@Injectable({
  providedIn: "root",
})
export class AlertService {
  alerts: ComponentRef<AlertComponent>[] = [];

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  createAlert(message: string, type: string, timeoutMS: number = 6000) {
    this.removeAlert();

    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory(AlertComponent)
      .create(this.injector);

    this.alerts.push(componentRef);

    componentRef.instance.message = message;
    componentRef.instance.type = type;
    componentRef.instance.dismiss.subscribe(() => {
      this.removeAlert();
    });

    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    document.body.appendChild(domElem);

    setTimeout(() => {
      this.removeAlert();
    }, timeoutMS);
  }

  removeAlert(): void {
    if (this.alerts.length > 0) {
      const alert = this.alerts.pop();
      this.appRef.detachView(alert.hostView);
      alert.destroy();
    }
  }
}