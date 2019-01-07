import amqp from 'amqplib/callback_api';
import _ from 'lodash';

const callD_alembert3 = (req, res, next) => {
  const { text, id, rules } = req.body;
  const idx = _.findIndex(req.session.studentData, { id });
  const student = req.session.studentData[idx];
  // mutating original text with new text
  if (text) student.text = text;
  const input = {
    id,
    text: text || student.text,
    rules
  };
  amqp.connect('amqp://localhost', (err, conn) => {
    conn.createChannel((err, ch) => {
      const simulations = 'simulations';
      const results = 'results';
      ch.assertQueue(simulations, { durable: false });
      ch.assertQueue(results, { durable: false });
      ch.sendToQueue(simulations, new Buffer(JSON.stringify(input)));
      ch.consume(results, msg => {
        conn.close();
        const { content } = msg;
        const analisysResults = JSON.parse(content.toString());
        res.json({
          data: {
            analisysResults: _.map(analisysResults, (obj, id) => ({ id, ...obj})),
            studentData: req.session.studentData
          }
        });
        // res.json({ data: contentJson });
      }, { noAck: true });
    });
  });
};

export {
  callD_alembert3
}
