const CognitiveServicesCredentials = require("@azure/ms-rest-js");
const TextAnalyticsAPIClient = require("@azure/cognitiveservices-textanalytics");
const express = require("express");
let app = express();

const {
    ActivityHandler
} = require('botbuilder');

class MyBot extends ActivityHandler {
    constructor() {
        super();
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        this.onMessage(async (context, next) => {
            let end = "https://westus.api.cognitive.microsoft.com/text/analytics/v2.1/sentiment?api_key=1d0b63768c434f9bbda8d148f3619aca";
            // app.post('end?api_key=1d0b63768c434f9bbda8d148f3619aca', 
            fetch(end, {
                    method: 'POST',
                    body: `${ context.activity.text }`
                })
                .then(res => res.json())


            await context.sendActivity(res); //output response
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
        console.log('Heyy')
        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    await context.sendActivity('Hello and welcome!');
                }
            }
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }
}

module.exports.MyBot = MyBot;
console.log('Heyy')
console.error();