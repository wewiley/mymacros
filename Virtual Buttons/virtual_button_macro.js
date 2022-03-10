const xapi = require('xapi');
function AlexaButton(button){
  console.log('***** Starting Function *****')
  var ACCESS_CODE =  'VIRTUAL BUTTON ACCESS CODE'
  var url = 'https://api.virtualbuttons.com/v1?virtualButton='+button+'&accessCode='+ACCESS_CODE;
  var headers = 'Content-Type: application/json';
  xapi.command('HttpClient Post', { 'Url': url, 'Header': headers}, 'ResultBody:PlainText');
  console.log('***** API Request Sent *****')
}
xapi.event.on('UserInterface Extensions Widget Action', (event) => {
    if(event.WidgetId == 'livetv'){
        if(event.Type == 'pressed'){
            xapi.command("UserInterface WebView Display", {URL: "https://app9.cloud.appspace.com/contents/28cc47cf-3087-46b5-9961-99c4a08b7f73/ae22ac82-f1d5-4ca4-8af4-04a757b7e49c/"});
        }
    }
    else if(event.WidgetId == 'wifi'){
        if(event.Type == 'pressed'){
            xapi.command("UserInterface WebView Display", {URL: "https://app9.cloud.appspace.com/contents/28cc47cf-3087-46b5-9961-99c4a08b7f73/7b1150c8-d44d-452d-9f7e-ecdc6b16ab73/#/"});
        }
    }
     else if(event.WidgetId == 'emergency'){
        if(event.Type == 'pressed'){
            xapi.command("UserInterface WebView Display", {URL: "https://app9.cloud.appspace.com/contents/28cc47cf-3087-46b5-9961-99c4a08b7f73/7b1150c8-d44d-452d-9f7e-ecdc6b16ab73/#/"});
        }
    }
})
xapi.event.on('UserInterface Extensions Widget Action', (event) => {
  if (event.Type == 'changed' && event.WidgetId == 'light_power'){
    console.log('Light power toggled');
    switch (event.Value){
      case'on':
        console.log('Lights turned on');
        AlexaButton(3);
        break;
      case 'off':
        console.log('Lights turned off');
        AlexaButton(4);
        break;
      default:
    }
    return;
  }
})
xapi.event.on('UserInterface Extensions Widget Action', (event) => {
  if (event.Type == 'pressed' && event.WidgetId == 'light_bright'){
    console.log('Light brightness changed');
    switch (event.Value){
      case '1':
        AlexaButton(5);
        break;
      case '2':
        AlexaButton(6);
        break;
      case '3':
        AlexaButton(7);
        break;
      case '4':
        AlexaButton(8);
        break;
      case '5':
        AlexaButton(9);
        break;
      case '6':
        AlexaButton(10);
        break;
      default:
    }
    return;
  }
})
