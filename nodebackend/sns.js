const AWS = require('aws-sdk');
AWS.config.update({region:'us-east-1'});

class SNS {
    constructor() {
        this._sns = new AWS.SNS()
        this.topicARN='arn:aws:sns:us-east-1:419011600616:AppBancaProjetos'
        this.appARN='arn:aws:sns:us-east-1:419011600616:app/APNS_SANDBOX/AmazonMobilePush'
        this.deviceToken='7e00932876f3200ba3d92f9da7f6e0aed7ad12f11a74836565c462bd6788811a'
        this.deviceTokenData='Iphone Carlos Arantes'
        this.message='Mensagem para o Topico'
    }

    subscribe(req, res, next) {
        var params = {
            'PlatformApplicationArn': this.appARN,
            'Token': this.deviceToken,
            'CustomUserData': this.deviceTokenData
        }

        console.log(params);

        this._sns.createPlatformEndpoint(params, (err, data) => {
            if (err) {
                return next(new Error(err))
            }    

            if (data) {
                console.log(data);
                const endpointArn = data.EndpointArn

                //Subscribe para o Topico
                var params = {
                    Protocol: 'application', 
                    TopicArn: this.topicARN,
                    Endpoint: endpointArn
                }

                this._sns.subscribe(params, (err, data) => {
                    if (err) {
                        return next(new Error(err))
                    } else {
                        if (data) {
                            console.log(data)
                            return res.status(200).json(data)
                        }
                    }
                })
            }
        })
    }

    push(req, res, next) {
        var params = {
            TargetArn: this.topicARN,
            Message: this.message
        }

        this._sns.publish(params, (err, data) => {
            if (err) {
                return next(new Error(err))
            } 
            
            if (data) {
                console.log(data);
                return res.status(200).json(data);
            }
        })
    }
}

module.exports = new SNS()