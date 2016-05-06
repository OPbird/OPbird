var utils = require('../server/utils/utils.js'),
expect = require('expect.js');

describe('Utils', function(){
    //Comprueba la funcion JSON esta bien disenna
    it('JSON con valor undefined', function(){
        var json = {"a": undefined, "b": "OK"};
        expect(utils.haveUndefinedJSON(json)).to.eql(true);
    });
    it('JSON sin valor undefined', function(){
        var json = {"a":"a", "b":"b"};
        expect(utils.haveUndefinedJSON(json)).to.eql(false);
    });
});
