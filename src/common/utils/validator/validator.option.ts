import * as _ from 'lodash';
import { HttpStatus, UnprocessableEntityException, ValidationError, ValidationPipeOptions } from '@nestjs/common';

const processErrors = (errors: ValidationError[]) => {
    return errors.reduce((acc, cur) => {
        const errorDetails =
            !!cur.children && _.get(cur, 'children.length', 0) > 0
                ? processErrors(cur.children)
                : _.join(_.values(cur.constraints), ', ');

        return _.merge({}, acc, { [cur.property]: errorDetails });
    }, {});
};

const globalValidationOptions: ValidationPipeOptions = {
    transform: true, //* Transformation for requested data field will be applied based on the class instance
    whitelist: true, //* The fields not defined in DTO will be removed.
    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    exceptionFactory: (errors: ValidationError[]) => {
        return new UnprocessableEntityException({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: processErrors(errors),
        });
    },
};

export default globalValidationOptions;
