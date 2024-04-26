import { HttpStatus, UnprocessableEntityException, ValidationError, ValidationPipeOptions } from '@nestjs/common';

const processErrors = (errors: ValidationError[]) => {
    return errors.reduce((acc, cur) => ({
        ...acc,
        [cur.property]:
            (cur.children?.length ?? 0) > 0
                ? processErrors(cur.children ?? []) //* Error has children: Process in recursive way.
                : Object.values(cur.constraints ?? {}).join(', '),
    }));
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
