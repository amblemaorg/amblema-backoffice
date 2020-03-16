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
        value = helper.readlyStatus([{ status : '2' }])[0].status; 
        expect( value ).toBe( STATUS.INACTIVE.MSG ); 
    }); 

    it('General - Should be incode status', () => {
        let dummyData: any = [
            { status : 'Activo' }
        ]; 
        let value = helper.incodeStatus( dummyData )[0].status;
        expect( value ).toBe( STATUS.ACTIVE.CODE );
        value = helper.incodeStatus([{ status: 'Inactivo' }])[0].status; 
        expect( value ).toBe(STATUS.INACTIVE.CODE); 
    });

    it('General - Should be encode type document', () => {
        expect( helper.encodeTypeDocument('V') ).toBe('1'); 
        expect( helper.encodeTypeDocument('J') ).toBe('2'); 
        expect( helper.encodeTypeDocument('E') ).toBe('3');
    });

    it('General - Should be readly type document', () => {
        expect( helper.readlyTypeDocument([{ cardType: '1' } ])[0].cardType ).toBe('V');
        expect( helper.readlyTypeDocument([{ cardType: '2' } ])[0].cardType ).toBe('J');
        expect( helper.readlyTypeDocument([{ cardType: '3' } ])[0].cardType ).toBe('E');
    });

    it('General - Should be filter json by id', () => {
        let data:any = [
            { id:'1', value: 'one' },
            { id:'2', value: 'two' }
        ]; 
        console.log('Imprimiendo: ' + data);
        expect( helper.filter( data, '2' ) ).toBe( data[0] );
    });
    
});
