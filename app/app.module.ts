import {NgModule} from "@angular/core";
import {EventsAppComponent} from "./events-app.component";
import {BrowserModule} from "@angular/platform-browser";
import {NavBarComponent} from "./nav/navbar.component";
import {TOASTR_TOKEN, Toastr} from "./common/toastr.service";
import {RouterModule} from "@angular/router";
import {appRoutes} from "./routes";
import {Error404Component} from "./errors/404.component";
import {
    CreateEventComponent,
    CreateSessionComponent,
    EventRouteActivator,
    EventsListResolver,
    EventDetailsComponent,
    EventService,
    EventsListComponent,
    EventThumbnailComponent,
    SessionListComponent,
    DurationPipe
} from './events/index';
import {AuthService} from "./user/auth.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CollapsibleWellComponent} from "./common/collapsible-well.component";

// Lets TypeScript know that this is a known variable
declare let toastr:Toastr;

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(appRoutes)
    ],
    declarations: [
        EventsAppComponent,
        EventsListComponent,
        EventThumbnailComponent,
        EventDetailsComponent,
        NavBarComponent,
        CreateEventComponent,
        Error404Component,
        CreateSessionComponent,
        SessionListComponent,
        CollapsibleWellComponent,
        DurationPipe
    ],
    providers: [
        EventService,
        {provide: TOASTR_TOKEN, useValue: toastr},
        EventRouteActivator,
        EventsListResolver,
        AuthService,
        { provide: 'canDeactivateCreateEvent', useValue: checkDirtyState }
    ],
    bootstrap: [EventsAppComponent]
})
export class AppModule {}

function checkDirtyState(component:CreateEventComponent) {
    if (component.isDirty) {
        return window.confirm('You have not saved this event, do you really want to cancel?');
    }
    return true;
}
