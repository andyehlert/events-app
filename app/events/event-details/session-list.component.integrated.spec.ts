import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {DebugElement, NO_ERRORS_SCHEMA} from "@angular/core";
import {DurationPipe} from "../shared/duration.pipe";
import {AuthService} from "../../user/auth.service";
import {By} from "@angular/platform-browser";
import {SessionListComponent} from "./session-list.component";
import {VoterService} from "./voter.service";

describe('SessionListComponent', () => {
    let fixture:ComponentFixture<SessionListComponent>,
        component:SessionListComponent,
        element:HTMLElement,
        debugEl:DebugElement;

    beforeEach(async(() => {
        let mockAuthService = {
            isAuthenticated: () => true,
            currentUser: {userName: 'Joe'}
        };
        let mockVoterService = {
            userHasVoted: () => true
        };

        TestBed.configureTestingModule({
            imports: [],
            declarations: [
                SessionListComponent,
                // UpvoteComponent,
                DurationPipe,
                // CollapsibleWellComponent
            ],
            providers: [
                {provide: AuthService, useValue: mockAuthService},
                {provide: VoterService, useValue: mockVoterService}
            ],
            schemas: [
                // Prevents errors when upvote and collapsible well components are encountered in the DOM
                NO_ERRORS_SCHEMA
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SessionListComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
        debugEl = fixture.debugElement;
    });

    describe('Initial display', () => {
        it('Should have the correct session title', () => {
            component.sessions =[{id: 3, name: 'Session 1', presenter: 'Joe', duration: 1, level: 'beginner', abstract: 'abstract', voters: ['john', 'bob']}];
            component.filterBy = 'all';
            component.sortBy = 'name';
            component.eventId = 4;

            component.ngOnChanges();
            fixture.detectChanges();

            expect(element.querySelector('[well-title]').textContent).toContain('Session 1');
            expect(debugEl.query(By.css('[well-title]')).nativeElement.textContent).toContain('Session 1')
        });
    });
});
