import {NgModule} from "@angular/core";
import {EventsAppComponent} from "./events-app.component";
import {BrowserModule} from "@angular/platform-browser";
import {NavBarComponent} from "./nav/navbar.component";
import {RouterModule} from "@angular/router";
import {appRoutes} from "./routes";
import {Error404Component} from "./errors/404.component";
import {AuthService} from "./user/auth.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
    JQ_TOKEN,
    TOASTR_TOKEN,
    Toastr,
    CollapsibleWellComponent,
    SimpleModalComponent,
    ModalTriggerDirective
} from "./common/index";
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
    DurationPipe,
    UpvoteComponent,
    VoterService
} from './events/index';

// Lets TypeScript know that this is a known variable
declare let toastr:Toastr;
declare let jQuery:Object;

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
        DurationPipe,
        SimpleModalComponent,
        ModalTriggerDirective,
        UpvoteComponent
    ],
    providers: [
        EventService,
        {provide: TOASTR_TOKEN, useValue: toastr},
        {provide: JQ_TOKEN, useValue: jQuery},
        EventRouteActivator,
        EventsListResolver,
        AuthService,
        VoterService,
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
