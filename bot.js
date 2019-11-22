// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityHandler } = require('botbuilder');

class EchoBot extends ActivityHandler {
    constructor() {
        super();
        var past = "";
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        this.onMessage(async (context, next) => {
            if(context.activity.text.includes("kanye")) {

                //////
                /*
                const filename = 'kanye.jpg';
                const stats = fs.statSync(path.join('C:\Users\thewa\Documents\botbuilder-samples\samples\javascript_nodejs\02.echo-bot', filename));
                const fileSize = stats.size;

                const consentContext = { filename: filename };
        
                const fileCard = {
                    description: 'This is the file I want to send you',
                    sizeInBytes: fileSize,
                    acceptContext: consentContext,
                    declineContext: consentContext
                };
                const asAttachment = {
                    content: fileCard,
                    contentType: 'image/jpg',
                    name: filename
                };

                await context.sendActivity({ attachments: [asAttachment] });
                */
                //////

                const response = await fetch('http://api.kanye.rest/');
                const myJson = await response.json();
                past = "Kanye West";
                await context.sendActivity(myJson.quote);
            } else if (context.activity.text.includes("ron")){
                const response = await fetch('https://ron-swanson-quotes.herokuapp.com/v2/quotes');
                const myJson = await response.json();
                past = "Ron Swanson";
                await context.sendActivity(JSON.stringify(myJson[0]).replace("\"", "").replace("\"", ""));
            } else if (context.activity.text.includes("?")) {
                await context.sendActivity(past + " said that.");
            } else {
                await context.sendActivity("Sorry, not sure who you're talking to!");
            }

            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    await context.sendActivity('Kanye, Ron, can I talk to you for a minute?');
                }
            }
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }
}

module.exports.EchoBot = EchoBot;
