import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

const validateConfiguration = <T extends object>(
    configuration: Record<string, unknown>,
    envConfigType: new () => T,
) => {
    const validatedConfiguration = plainToClass(envConfigType, configuration, {
        enableImplicitConversion: true,
    });

    const validationErrors = validateSync(validatedConfiguration, {
        skipMissingProperties: false,
    });

    if (validationErrors.length > 0) {
        //* TODO: Define Error
    }

    return validatedConfiguration;
};

export default validateConfiguration;
