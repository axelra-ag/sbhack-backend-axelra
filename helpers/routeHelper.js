module.exports = {
  /**
   * Default response to send an error and the data.
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  defaultResponse: (req, res) => {
    return (err, data) => {
      if (err) {
        return res.status(500).json({ success: false, message: err });
      } else {
        return res.json(data);
      }
    };
  }
};
