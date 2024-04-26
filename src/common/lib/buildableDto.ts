import * as _ from 'lodash'
class BuildableDto {
    static build<T extends BuildableDto>(this: new () => T, fields: Partial<T>): T {
        const dto = new this();
        const properties = Object.keys(dto)
        const validFields = _.pick(fields, properties)
        return Object.assign(dto, validFields);
    }

    freeze(): this {
        return Object.freeze(this);
    }
}

export default BuildableDto;
