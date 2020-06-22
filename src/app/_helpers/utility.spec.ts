import { Utility } from './utility';
import { STATUS } from '../_helpers/convention/status';

describe('Utility class', () => {

    const helper: Utility = new Utility();

    it('General - Should be readly status', () => {
        const dummyData: any = [
            { status: '1' }
        ];
        let value = helper.readlyStatus( dummyData )[0].status;
        expect( value ).toBe( STATUS.ACTIVE.VALUE );
        value = helper.readlyStatus([{ status : '2' }])[0].status;
        expect( value ).toBe( STATUS.INACTIVE.VALUE );
    });

    it('General - Should be incode status', () => {
        const dummyData: any = [
            { status : 'Activo' }
        ];
        let value = helper.incodeStatus( dummyData )[0].status;
        expect( value ).toBe( STATUS.ACTIVE.VALUE );
        value = helper.incodeStatus([{ status: 'Inactivo' }])[0].status;
        expect( value ).toBe(STATUS.INACTIVE.VALUE);
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
        const data: any = [
            { id: '1', value: 'one' },
            { id: '2', value: 'two' }
        ];
        expect( helper.filter( data, '2' ) ).toContain(data[1]);
    });

    it('General - Should convert tag post', () => {
        const data: any = [
            { tag: '1' },
        ];

        expect( helper.convertTagsNumberToString(data)[0].tag).toBe('Ambiente');
        expect( helper.convertTagsNumberToString([{tag: '2'}])[0].tag).toBe('Lectura');
        expect( helper.convertTagsNumberToString([{tag: '3'}])[0].tag).toBe('Matemáticas');
        expect( helper.convertTagsNumberToString([{tag: '4'}])[0].tag).toBe('Otra');

        data.tag = 'Ambiente';
        expect( helper.convertTagStringToNumber(data).tag ).toBe('1');
        data.tag = 'Lectura';
        expect( helper.convertTagStringToNumber(data).tag ).toBe('2');
        data.tag = 'Matemáticas';
        expect( helper.convertTagStringToNumber(data).tag ).toBe('3');
        data.tag = 'Otra';
        expect( helper.convertTagStringToNumber(data).tag ).toBe('4');
    });

    it('General - Should be public code post', () => {
        expect( helper.convertStatusPostToString( [ { status: '1' } ] )[0].status ).toBe('Publicado');
        expect( helper.convertStatusPostToString( [ { status: '2' } ] )[0].status ).toBe('No publicado');

        const data: any = { status : 'Publicado' };
        expect( helper.convertStatusPostToNumber(data).status ).toBe( '1' );
        data.status = 'No publicado';
        expect(helper.convertStatusPostToNumber(data).status).toBe('2');
    });

    it('General - Should be image or video', () => {
        const data: any = [{ type: '1' }];
        expect( helper.mediaNumberToString(data)[0].type ).toBe('Imagen');
        data[0].type = '2';
        expect( helper.mediaNumberToString(data)[0].type ).toBe('Video');
    });
});
