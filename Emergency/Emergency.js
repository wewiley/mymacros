const xapi = require('xapi');
const token = "WEBEX API AUTH TOKEN"
const room = "ROOM ID WHERE TO POST THE MESSAGE"

xapi.event.on('UserInterface Extensions Widget Action', (event) => {
  if(event.WidgetId == 'emergency' && event.Type == 'pressed'){
    sendTeamsMessage();
    xapi.command('UserInterface Message Alert Display', {
            Title: "Message Sent!",
            Text: "Your Emergency Alert has been sent to the ERT",
            })
  }
function sendTeamsMessage(){
    let payload = {
      "text": "Emergency Notification",
      "roomId": room,
      "attachments": [
          {
            "contentType": "application/vnd.microsoft.card.adaptive",
            "content": {
              "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
              "type": "AdaptiveCard",
              "version": "1.0",
              "body": [
                {
                  "type": "ColumnSet",
                  "columns": [
                    {
                      "type": "Column",
                      "width": 2,
                      "items": [
                        {
                          "type": "TextBlock",
                          "text": "EMERGENCY RESPONSE NOTIFICATION"
                        },
                        {
                          "type": "TextBlock",
                          "text": "Location: Conference Room 1",
                          "weight": "Bolder",
                          "size": "Medium",
                          "spacing": "None"
                        },
                        {
                          "type": "TextBlock",
                          "text": "Emergency event triggered from room touch panel.  Please respond ASAP.",
                          "wrap": true,
                          "size": "small"
                        }
                      ]
                    },
                    {
                      "type": "Column",
                      "width": 1,
                      "items": [
                        {
                          "type": "Image",
                          "url": "https://635.gtbank.com/wp-content/uploads/2018/08/Emergency.jpg",
                          "size": "auto"
                        }
                      ]
                    }
                  ]
                }
              ],
              "actions": [
                {
                  "type": "Action.Submit",
                  "title": "Respond"
                },
                {
                  "type": "Action.Submit",
                  "title": "Defer"
                }
              ]
            }
          }
        ]
    }
  xapi.command(
    'HttpClient Post',
    {
         Header: ["Content-Type: application/json", "Authorization: Bearer " + token],
         Url: "https://webexapis.com/v1/messages",
         AllowInsecureHTTPS: "True",
         ResultBody: 'plaintext'
      },
      JSON.stringify(payload))
      .then((response) => {
        console.debug(`received response with status code: ${response.StatusCode}`);

         if (response.StatusCode == 200) {
            console.log("message pushed to Webex Teams");

            // Retrieve message id
            let result = JSON.parse(response.Body);
            console.log(`message id: ${result.id}`);
            return;
         }

         // This should not happen as Webex REST API always return 200 OK for POST requests
         console.log("failed with status code: " + response.StatusCode);
      })
      .catch((err) => {
         console.log(`failed with err message: ${err.message}`);
         console.log(`failed with err status: ${err.data.status}`);
          // Typically: hostname not found
          if (err.data.Message) {
              console.log("data message: " + err.data.Message);
          }

          // Typically: the response status code is 4xx or 5xx
          if (err.data.StatusCode) {
              console.log("status code: " + err.data.StatusCode);
          }


      }
    )
  }
})
