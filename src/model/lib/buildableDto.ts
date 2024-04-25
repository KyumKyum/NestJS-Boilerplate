import { BaseEntity } from 'typeorm';

class BuildableDto {
    static build<T extends BuildableDto>(this: new () => T, fields: T): T {
        const dto = new this();
        return Object.assign(dto, fields);
    }
}

export default BuildableDto;
