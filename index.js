exports.topsecret = (req, res) => {
    let message = req.query.message || req.body.message || 'Repositorio Hola Top Secret!';
    res.status(200).send(message);
  };
  