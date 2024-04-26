import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import DataNotValidException from '../../exception/DataNotValidException';

const validateData = <T extends object>(recv: Record<string, unknown>, target: new () => T): T => {
    const validated = plainToClass(target, recv, {
        enableImplicitConversion: true,
    });

    const validationErrors = validateSync(validated, {
        skipMissingProperties: false,
    });

    if (validationErrors.length > 0) {
        throw new DataNotValidException();
    }

    return validated;
};

export default validateData;
