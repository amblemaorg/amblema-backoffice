import { State, NgxsOnInit } from '@ngxs/store';
import { GeneralEnrolled } from 'src/app/models/_enrolled/general-enrolled.model';

export class GetEnvironmentalProject  {
    static readonly type = '[GeneralEnrolled] Get General Enrolled';
}

@State<GeneralEnrolled>({
    name: 'generalenrolled',
    defaults: {
        enrolledSchools: [],
        availableSchools: []
    }
})
export class GeneralEnrolledState implements NgxsOnInit {
    
    
    
    ngxsOnInit() : void {}


}
