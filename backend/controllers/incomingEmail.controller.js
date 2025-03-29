import Imap from 'imap';
import { simpleParser } from 'mailparser';
import IncomingEmail from '../models/incomingEmail.model.js';
import { User } from '../models/user.model.js';
import { v4 as uuidv4 } from 'uuid'; 

async function fetchAndSaveEmails(user) {
  const imap = new Imap({
    user: user.imapConfig.username,
    password: user.imapConfig.password,
    host: user.imapConfig.host,
    port: user.imapConfig.port,
    tls: user.imapConfig.secure,
    tlsOptions: {
      rejectUnauthorized: false,
    },
  });

  function openInbox(cb) {
    imap.openBox('INBOX', true, cb);
  }

  imap.once('ready', function () {
    openInbox(function (err, box) {
      if (err) throw err;
      imap.search(['UNSEEN'], function (err, results) {
        if (err) throw err;
        if (results.length === 0) {
          imap.end();
          return;
        }
        const f = imap.fetch(results, { bodies: '' });
        f.on('message', function (msg, seqno) {
          msg.on('body', function (stream, info) {
            simpleParser(stream, async (err, parsed) => {
              if (err) throw err;
              try {
                let messageId = parsed.id;
                if (!messageId) {
                  messageId = uuidv4();
                }

                const incomingEmail = new IncomingEmail({
                  sender: parsed.from.text,
                  recipient: user.email,
                  subject: parsed.subject,
                  body: parsed.text || parsed.html,
                  date: parsed.date,
                  userId: user._id,
                  messageId: messageId,
                });

                await incomingEmail.save();
              } catch (saveError) {
                console.error('Error saving email:', saveError);
                
              }
            });
          });
        });
        f.once('end', function () {
          imap.end();
        });
      });
    });
  });

  imap.once('error', function (err) {
    console.error('IMAP error:', err);
  });

  imap.once('end', function () {
    console.log('Connection ended');
  });

  imap.connect();
}

const getInbox = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user || !user.imapConfig) {
      return res.status(400).json({ message: 'IMAP Configuration not found' });
    }
    await fetchAndSaveEmails(user); 

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10; 
    const skip = (page - 1) * limit;

    const incomingEmails = await IncomingEmail.find({ userId: user._id })
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    const totalEmails = await IncomingEmail.countDocuments({ userId: user._id });
    const totalPages = Math.ceil(totalEmails / limit);
                                
    res.json({
      data: incomingEmails,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        totalEmails: totalEmails,
      },
    });
  } catch (error) {
    console.error('Error fetching inbox:', error);
    res.status(500).json({ message: 'Failed to fetch inbox' });
  }
};

async function fetchSingleEmail(user, messageId) {
  return new Promise((resolve, reject) => {
    const imap = new Imap({
      user: user.imapConfig.username,
      password: user.imapConfig.password,
      host: user.imapConfig.host,
      port: user.imapConfig.port,
      tls: user.imapConfig.secure,
      tlsOptions: {
        rejectUnauthorized: false,
      },
    });

    function openInbox(cb) {
      imap.openBox('INBOX', true, cb);
    }

    imap.once('ready', function () {
      openInbox(function (err, box) {
        if (err) {
          imap.end();
          return reject(err);
        }

        imap.search(['UNSEEN'], function (err, results) { 
          if (err) {
            imap.end();
            return reject(err);
          }

          if (results.length === 0) {
            imap.end();
            return resolve(null); 
          }

          const f = imap.fetch(results, { bodies: '' });
          const emails = [];

          f.on('message', function (msg, seqno) {
            msg.on('body', function (stream, info) {
              simpleParser(stream, async (err, parsed) => {
                if (err) {
                  return reject(err);
                }
                emails.push(parsed);
              });
            });
          });

          f.once('error', function (err) {
            imap.end();
            reject(err);
          });

          f.once('end', function () {
            imap.end();
            const foundEmail = emails.find(
              (email) => email.id === messageId || email.id === `<${messageId}>` || email.id === `"${messageId}"`
            );

            if (foundEmail) {
              resolve(foundEmail);
            } else {
              resolve(null); 
            }
          });
        });
      });
    });

    imap.once('error', function (err) {
      imap.end();
      reject(err);
    });

    imap.connect();
  });
}


const getSingleEmail = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const messageId = req.params.messageId;

    const incomingEmail = await IncomingEmail.findOne({
      messageId: messageId,
      userId: user._id,
    });

    if (!incomingEmail) {
      return res.status(404).json({ message: 'Email not found' });
    }

    res.json({ data: incomingEmail });

  } catch (error) {
    console.error('Error fetching single email from database:', error);
    res.status(500).json({ message: 'Failed to fetch email' });
  }
};

export { getInbox, getSingleEmail };




