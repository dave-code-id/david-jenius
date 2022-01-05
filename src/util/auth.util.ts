// @ts-ignore
import jwt, {Artifacts, Secret, VerifyTokenOptions} from '@hapi/jwt';

const secretKey = 'jenius-dave-key';

const generateToken = (): string => {
    return jwt.token.generate(
        {
            aud: 'urn:audience:test',
            iss: 'urn:issuer:test',
            user: 'hardcoded-user',
            group: 'hapi_community'
        },
        {
            key: secretKey,
            algorithm: 'HS512'
        },
        {
            ttlSec: 14400 // 4 hours
        }
    );
}

const verifyToken = (token: string) => {
    try {
        const decodedToken = jwt.token.decode(token);
        jwt.token.verify(decodedToken, secretKey);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};

const authUtil = {
    generateToken,
    verifyToken
}

export default authUtil;
