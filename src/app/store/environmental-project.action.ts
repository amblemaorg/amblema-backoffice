


// -- Actions --

import { State, NgxsOnInit, StateContext, Action } from '@ngxs/store';
import { EnvironmentalProject } from '../models/environmental-project.model';
import { OnDestroy } from '@angular/core';
import { EnvironmentalProjectService } from '../services/environmental-project.service';
import { patch } from '@ngxs/store/operators';
import { Subscription } from 'rxjs';

export class GetEnvironmentalProject {
    static readonly type = '[EnvironmentalProject] Get All EnvironmentalProject';
}

@State<EnvironmentalProject>({
    name: 'environmentalproject',
    defaults: {
        name: '',
        lapse1: {
            generalObjective: '',
            topics: []
        },
        lapse2: {
            generalObjective: '',
            topics: []
        },
        lapse3: {
            generalObjective: '',
            topics: []
        },
    }
})

export class EnvironmentalProjectState implements NgxsOnInit, OnDestroy {

    subscriptionEnvironmentalProject: Subscription;

    constructor( 
        private environmentalProjectServivce: EnvironmentalProjectService ) {}

    ngxsOnInit( ctx: StateContext<EnvironmentalProject> ) : void {
        ctx.dispatch( new GetEnvironmentalProject() );
    }

    ngOnDestroy() {
        if( this.subscriptionEnvironmentalProject ) {
            this.subscriptionEnvironmentalProject.unsubscribe();
        }
    }

    @Action( GetEnvironmentalProject ) 
    getEnvironmentalProject( ctx: StateContext<EnvironmentalProject>, action: GetEnvironmentalProject ) {
        this.subscriptionEnvironmentalProject = this.environmentalProjectServivce.getEnvironmentalProject( ).subscribe( response => {
            ctx.setState(response);
        } );
    }
}
