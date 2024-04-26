import { BaseEntity } from 'typeorm';

class BuildableDto {
    static build<T extends BuildableDto>(this: new () => T, fields: Partial<T>): T {
        const dto = new this();
        return Object.assign(dto, fields);
    }

    freeze(): this {
        return Object.freeze(this);
    }
}

export default BuildableDto;
