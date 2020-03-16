import { Utility } from "./utility";
import { STATUS } from './text-content/status';

describe('Utility class', () => {

    let helper: Utility = new Utility();
    
    it('General - Should be readly status', () => {
        let dummyData: any = [
            { status: '1' }
        ];

        let value = helper.readlyStatus( dummyData )[0].status;

        expect( value ).toBe( STATUS.ACTIVE.MSG );
    }); 
});
