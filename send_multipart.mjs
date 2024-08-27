import Nylas from 'nylas'
import * as fs from 'fs'
import 'dotenv/config'

// Set up Nylas client
const nylas = new Nylas({
    apiKey: process.env.API_KEY, // Required to make API calls.
});

const identifier = process.env.GRANT_ID

async function readFile() {
    const fileStats = fs.statSync("10mbfile");

    let attachmentStream = fs.createReadStream('10mbfile')
  
    return {
      content: attachmentStream,
      filename: "10mbfile",
      size:fileStats.size
    }
}

async function sendMessage() {

    const pdfAttachment = await readFile()
    const message = {
        to: [
          {
            email: "example@example.com",
          },
        ],
        subject: "Attachment Test",
        body: "Test body",
        attachments:[pdfAttachment]
      };
    
      try {
        const { data } = await nylas.messages.send({
          identifier: identifier,
          requestBody: message,
        });
        console.log(data)
      } catch (error) {
        console.log("Error sending");
      }
}

sendMessage();