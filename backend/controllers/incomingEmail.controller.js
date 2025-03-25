import Imap from 'imap';
import { simpleParser } from 'mailparser';
import IncomingEmail from '../models/incomingEmail.model.js';
import { User } from '../models/user.model.js';
import { v4 as uuidv4 } from 'uuid'; // Import UUID library

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
                  // Generate a unique ID if messageId is missing
                  messageId = uuidv4();
                  // console.log('Generated message ID:', messageId);

                  // Option 2: Skip saving (with logging)
                  // console.warn("Skipping email save due to missing messageId");
                  // imap.setFlags(msg.attrs.uid, ['\\Seen'], function(err) {
                  //   if (err) {
                  //     console.error("Error setting Seen flag:", err);
                  //   }
                  // });
                  // return;
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
                // Handle save errors appropriately
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

// Example API endpoint
const getInbox = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user || !user.imapConfig) {
      return res.status(400).json({ message: 'IMAP Configuration not found' });
    }
    await fetchAndSaveEmails(user); // Fetch emails

    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 10; // Default to 10 emails per page
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

export { getInbox };




