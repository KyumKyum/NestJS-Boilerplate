import { BaseEntity } from 'typeorm';

class BuildableEntity extends BaseEntity {
    static build<T extends BaseEntity>(this: new () => T, fields: Partial<T>): T {
        const entity = new this();
        return Object.assign(entity, fields);
    }
}

export default BuildableEntity;
