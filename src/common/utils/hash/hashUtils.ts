import * as bcrypt from 'bcrypt';

export class HashUtils {
    private static SALT_ROUNDS = 10;

    static generateHash = async (pt: string): Promise<string> => {
        return await bcrypt.hash(pt, this.SALT_ROUNDS);
    };

    static compareHash = async (pt: string, ct: string): Promise<boolean> => {
        return await bcrypt.compare(pt, ct);
    };
}
