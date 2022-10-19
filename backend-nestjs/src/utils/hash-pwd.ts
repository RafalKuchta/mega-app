import * as crypto from 'crypto';

export const hashPwd = (p: string): string => {
    const hmac = crypto.createHmac('sha512', 'rwt w3254t  W f#W F#hfLFF iOISg4w83F)*0 09j09J09GJ094094WJ4E 09J  jElfEJLIFJ# of3 jf(ghndg #J#p9f3j9f #FjFjL#Fh o3hfwofdg 6556u53');
    hmac.update(p);
    return hmac.digest('hex');
};
