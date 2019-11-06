module.exports = function(app) {
  if(typeof app.channel !== 'function') {
    return;
  }

  app.on('connection', connection => {
    app.channel('anonymous').join(connection);
  });

  app.publish((data, hook) => {
    return app.channel('anonymous');
  });
};
