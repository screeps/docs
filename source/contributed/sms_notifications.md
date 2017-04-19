title: In Game SMS Notifications
---

While the notification system in Screeps is nice sometimes it's even nicer to get a text message. This tutorial outlines how to install and use the [ScreepsNotify](https://github.com/screepers/screeps_notify) project to let your game alert you when it needs your attention.


## Install Screeps Notify Library

The Notify project uses an in game [library](https://github.com/screepers/screeps_notify/blob/master/js/Notify.js) (with [typescript definitions](https://github.com/screepers/screeps_notify/blob/master/js/notify.d.ts) to store messages in memory which get picked up by the notify program.

This is a standard javascript module. The file should be downloaded into your code can be accessed with `require`.

    const Notify = require('notify')

Once there sending notifications is a simple function call that mirrors the Screeps API `Game.notify()` function. The first argument is a message, and the second is used to rate limit the message so it isn't sent repeatedly. By default messages will be sent every tick, but it's recommended that limits be put in place to avoid draining Trilio credits.

    // Message will only not be sent more than once in 5000 ticks.
    Notify('Enemy creeps attacking in room E134N83', 5000)


    // Message will only not be sent every tick.
    Notify('Enemy creeps attacking in room E134N83')


Since metadata about messages has to be stored it's important to clear that data out. Although it does not need to run every tick it is important to call `Notify.clean()` occasionally to prevent excess memory from being used.

    // Clean up messages older than X ticks
    Notify.clean(10000)

    // Clean up messages older than 20000 ticks
    Notify.clean()


## Get Twilio

{% note warn %}
Twilio is not a free service. Phone numbers will cost you $1.00 a month, and text messages cost $0.0075 per message. Sending 75 messages a month will cost $1.5625 ($1.00 for the phone number and 0.5675 for the text messages).
{% endnote %}


Head over to the [Twilio Signup](https://www.twilio.com/try-twilio) page to get started.

Once your account is created you will need to [Buy a Number](https://www.twilio.com/console/phone-numbers/search). The number should have SMS capabilities.

Next you'll want to head to the [SMS Dashboard](https://www.twilio.com/console/sms/dashboard) and register a new service. On the Numbers page select the new number you created.


## Install Docker

Don't worry, you will not need to become a Docker expert, but you will need to install it.

Docker is available on [Windows](https://store.docker.com/editions/community/docker-ce-desktop-windows?tab=description), [OSX](https://store.docker.com/editions/community/docker-ce-desktop-mac?tab=description), [Ubuntu](https://store.docker.com/editions/community/docker-ce-server-ubuntu?tab=description), and [numerous other systems](https://store.docker.com/search?type=edition&offering=community).


## Configure Screeps Notify

Clone the repository to your system and enter it

    git clone https://github.com/screepers/screeps_notify.git
    cd screeps_notify

First copy the template settings file.

    cp .settings.dist.yaml .settings.yaml

You'll need to add your account credentials for Screeps, the phone number (both [sending](https://www.twilio.com/console/phone-numbers/dashboard) and receiving), and your [twilio api credentials](https://www.twilio.com/console).

```yaml
# Screeps account info
screeps_username: <username>
screeps_password: <password>
screeps_ptr: false

# Your Account SID from www.twilio.com/console
twilio_sid: <sid>

# Your Auth Token from www.twilio.com/console
twilio_token: <auth>

# You SMS number from twilio. https://www.twilio.com/console/phone-numbers/dashboard
sms_from: '+15555555555'

# This should be the number you want to receive the texts.
sms_to: '+13334445555'
```

Finally build the Docker container. Any time your change your settings you will need to run this command.

    docker build -t screepsnotify .

## Make it Run

To get notifications you have to run screepsnotify, which is now as as as typing in a single command-

    docker run --rm screepsnotify

Of course you don't want to have to type that in manually. Open your crontab-

    EDITOR=nano crontab -e

Now add the following line, which will tell cron to run the command every minute.

    * * * * * /usr/bin/docker run --rm screepsnotify >/dev/null 2>&1


## Take a Nap

Your scripts are running fine, and if they fail for any reason they can let you know. Enjoy your newfound freedom to walk away from Screeps.
