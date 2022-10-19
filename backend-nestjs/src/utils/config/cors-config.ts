import configuration from './configuration';

const { ssl, port, domain } = configuration().server;

const whitelistAddress = [
  `${ssl ? 'https://' : 'http://'}${domain}:3000`,
];
const whitelistMethod = [`GET`, 'PUT', 'POST', 'PATCH', 'DELETE'];

export const whitelistCors = {
  address: whitelistAddress,
  methods: whitelistMethod,
};
