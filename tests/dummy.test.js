const dummy = require('../utils/list_helper').dummy;

test("dummy always returns one...", () => {
    const result = dummy(4);
    
    expect(result).toBe(1);
});