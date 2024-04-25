import {User} from "../../src/model/user/user.entity";

describe('User Entity Test', () => {
    const ident = 'thisisid';
    const name = 'name';
    const password = 'thisispassword';

    it('User is a buildable entity', () => {
        const user = User.build({ ident, name, password });
        //console.log(user);
        expect(user).not.toBeNull();
        expect(user.ident).toBe(ident);
        expect(user.name).toBe(name);
        expect(user.password).toBe(password);
    });
});
