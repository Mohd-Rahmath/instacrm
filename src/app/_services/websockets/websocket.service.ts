import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import * as AWS from 'aws-sdk/global'
import AWSMqttClient from 'aws-mqtt'
import {AuthenticationService} from "../authentication/authentication.service";

AWS.config.region = environment.aws.region;
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: environment.aws.cognito.identityPoolId
});

@Injectable({
  providedIn: 'root'
})
export class WebsocketService implements OnInit, OnDestroy {

  client: any;

  constructor(
    private authenticationService: AuthenticationService,
  ) {
    this.getClient();
    // @ts-ignore
    // AWS.config.credentials.get((err) => {
    //   if (err) {
    //     console.log(err);
    //     return;
    //   }
    //
    //   const user = this.authenticationService.getUser()
    //
    //   const options = {
    //     region: AWS.config.region,
    //     credentials: AWS.config.credentials,
    //     endpoint: environment.aws.iotMqtt, // NOTE: get this value with `aws iot describe-endpoint`
    //     expires: 600, // Sign url with expiration of 600 seconds
    //     clientId: 'mqtt-client-' + user.name.replace(' ', ''), // clientId to register with MQTT broker. Need to be unique per client
    //     // will: {
    //     //   topic: 'WillMsg',
    //     //   payload: 'Connection Closed abnormally..!',
    //     //   qos: 0,
    //     //   retain: false
    //     // }
    //   }
    //
    //   console.log('options', options);
    //
    //   const client = new AWSMqttClient(options)
    //   this.client = client
    //   // client.on('connect', () => {
    //   //   console.log('connected')
    //   //   client.subscribe('gold/24/price')
    //   // })
    //   client.on('message', (topic, message) => {
    //     console.log(topic, message)
    //   })
    //   client.on('close', () => {
    //     // ...
    //   })
    //   client.on('offline', () => {
    //     // ...
    //   })
    // });
  }

  ngOnInit() {

  }

  getClient() {
    this.setupClient()
      .then(options => {
        this.client = new AWSMqttClient(options);

        this.client.on('connect', () => {
          console.log('connected')
        })
      });
  }

  setupClient() {
    const user = this.authenticationService.getUser()
    return new Promise((resolve, reject) => {
      // @ts-ignore
      AWS.config.credentials.get((err) => {
        if (err) {
          console.log(err);
          reject(err)
          return;
        }

        const options = {
          region: AWS.config.region,
          credentials: AWS.config.credentials,
          endpoint: environment.aws.iotMqtt, // NOTE: get this value with `aws iot describe-endpoint`
          expires: 600, // Sign url with expiration of 600 seconds
          clientId: 'mqtt-client-' + user.name.replace(' ', ''), // clientId to register with MQTT broker. Need to be unique per client
          // will: {
          //   topic: 'WillMsg',
          //   payload: 'Connection Closed abnormally..!',
          //   qos: 0,
          //   retain: false
          // }
        }

        resolve(options)
      });
    });
  }

  subscribe(topic: string, callback) {
    console.log('subscribe', topic)
    this.setupClient()
      .then(options => {
        this.client = new AWSMqttClient(options)
        this.client.on('connect', () => {
          console.log('connected')
          this.client.subscribe(topic)
        })

        this.client.on('message', (awsTopic, message) => {
          if (awsTopic === topic) {
            console.log(awsTopic, JSON.parse(message))
            callback(JSON.parse(message))
          }
        })
      });
  }

  // unsubscribe(topic: string): void {
  //   if (!!this.subscriptions[topic]) {
  //     this.subscriptions[topic].unsubscribe();
  //   }
  // }

  ngOnDestroy() {
    // for (const s of this.subscriptions) {
    //   s.unsubscribe();
    // }


    // this.client.on('close', () => {
    //   // ...
    // })
  }

}
