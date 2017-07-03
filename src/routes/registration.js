module.exports = {
  method: 'GET',
  path: '/registration',
  handler: (request, reply) => {
    console.log(request.auth.credentials);
    reply('registration');
  },
};
