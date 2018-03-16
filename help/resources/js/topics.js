var faq = [{
  title: "Notification Help",
  items: [{
    keywords: "notification information",
    title: "How do notifications work in Talon?",
    text: "If you are looking for push notifications, please read the topic on Push Notifications, at the bottom, instead." + brbr() +
          "To receive notifications based on your <i>Notification Settings</i> section of the app, you need to enable background refreshes for the timelines that you want to get notified for (under Sync Settings)." + brbr() +
          "For example, if you want to receive a notification every time someone mentions you or sends you a direct message, then enable a background refresh interval for those timelines before turning on the notifications for them." + brbr() +
          "If you want to get notifications for interactions (new followers, retweets, favorites), then the same idea applies, but I would ask that you read about the activity section of Talon from the topic below." + brbr() +
          "Another topic below also discusses notifications from favorite users and how to enable those."
  }, {
    keywords: "push notifications push-notifications",
    title: "Can Talon receive push notifications?",
    text: "Push notifications will not be coming to Talon unless something changes with the Twitter APIs. I have created <i>Talon Pull</i> which is simply an always on, listening/streaming service that will receive new tweets from Twitter whenever your Twitter handle is included." + brbr() +
          "<b>Reasons</b>" + br() +
          "This will be the more technical part of this post, if you don't want to read and understand it, then you will have to just accept my answer from above. If you don't accept that I know what I am talking about... Then by all means, read on, I will try to keep it as simple as possible." + brbr() +
          "To access Twitter, they have provided us with the REST APIs (currently version 1.1). These APIs allow developers to communicate with Twitter in real time by just submitting requests to get data from the network. They make it relatively simple - if you know what your doing - to obtain the data that they allow you to get and store, but there are plenty of limitations to these APIs, which make sense: Twitter is a completely free service and make their money off of advertisements. They want people to use their official Twitter products (such as the web or their own Android app) to access their services because they are able to place advertisements in them and that is the only way they make money. So they just aren't going to make some things available for 3rd party developers." + brbr() +
          "One of those things is their push notification system. As I said before, they allow us to access their services with these REST APIs, but they also have a Streaming API available so that a 3rd party service, such as this one, could be always connected. Sounds great right? Maybe, maybe not. On Lollipop+, this takes up a massive amount of battery, and usage will not be able to be reduced." + brbr() +
          "What these streaming APIs should be used for is a server side interaction that would then connect to GCM (Google Cloud Messaging) and send push notifications from there. I would love to say I am working on something like this, but it isn't possible for developers at this time. Twitter has shut down access to the Site Stream API that would be required for something like this. Until they open it once again to the public, Talon will not be able to use any kind of push notification." + brbr() +
          "That leaves only one thing to do: wait. Maybe Twitter will open up some kind of push notification service to it's developers, but I wouldn't count on that. The ideal thing for them to do would be to set up their own GCM server for us to communicate with, but I don't see that as being likely at all because of the advertising. That would take away one of the main draws for their app, leaving it with almost nothing that 3rd party developers can't do." + brbr() +

          "<b>Twitter Push Notification Interceptor</b>" + br() +
          "Talon has the ability to watch for the official Twitter app's push notifications. When one of that app's notifications goes off, Talon will basically hijack it and replace it with it's own notification. This is probably the ideal solution for most users. To learn more about how it works and set it up, please see the <i>\"interceptor\"</i> topic, below." + brbr() +

          "<b>Talon Pull - My other solution/workaround</b>" + br() +
          "As I said before, this is NOT push notifications. Push notifications are sent to your device to notify you from some kind of server. They aren't always on, and only turn on when your device receives the info from the web service." + brbr() +
          "Talon Pull on the other hand, uses Twitter's Streaming API to just create an <i>always on</i> service to be constantly listening for and streaming tweets that contain your Twitter Handle. The way this works is that you are signed in with your API keys after you turn on the option to enable Talon Pull. I then just create this listener that Twitter's servers will send new tweets to. Luckily, they will take care of most of the filtering of those tweets on their end, to reduce the load as much as possible on your device (because before the filtering, it literally will receive every single public tweet that is happening. It was amazing when I first flipped and saw the tweets flowing over my log haha). So we filter it down to as few of tweets actually reaching your device as possible, then I start broadcasting the notifications when you receive the new ones." + brbr() +
          "Overall, it is a relatively simple process, the problem with it though, you have probably already realized, you have to be constantly connected with a data service or the app won't know when to receive the new tweets. Obviously that is the part that is going to end up taking the battery." + brbr() +

          "<b>Conclusion</b>" + br() +
          "Thanks for the read, if you made it all the way, hope that gives you an idea as to why push notifications just aren't even an option at this point and what my solution to that problem has been, even if it is not ideal. It works, and it seems to be working quite well for me." + brbr() +
          "So just know: <i>Talon Pull</i> isn't quite the same as push notifications, but it is as close as possible at this time. Enjoy!"
  }, {
    keywords: "push notifications twitter app interceptor",
    title: "What is the Twitter push notification interceptor and how does it work?",
    text: "<b>How it works</b>" + br() +
          "Basically, whenever a Twitter notification comes in, Talon will grab that notification, and dismiss it through Android's " + link("NotificationListenerService APIs", "https://developer.android.com/reference/android/service/notification/NotificationListenerService.html") + ", then replace that notification with my own." + brbr() +
          "The notification will kick off a specific <i>Activity</i> refresh within Talon. Talon has had an <i>Activity</i> page for a few years now. It doesn't match Twitter's notification section, but it provides likes, retweets, new followers, quotes, and mentions when possible. Twitter has no official API for most of these things, so this section is a bit of a hacky workaround. It does work for the majority of people, but there are a number of reasons why it might not work for you (tweeting a lot or having a protected account are the big ones)." + brbr() +
          "After the <i>Activity</i> refresh is complete, Talon will provide you with a notification for anything that is new. And that's it." + brbr() +
          "So Talon is really just hijacking Twitter's push notification system and forcing a refresh on my side instead. It will work great for pretty much anyone, the only drawback is that you have to have the official Twitter app installed as well." + brbr() +

          "<b>What it doesn't do</b>" + br() +
          "This method will not replicate favorite user tweets, or highlights notifications, from the official Twitter app. It will get likes, retweets, mentions, new followers, and quotes." + brbr() +
          "Any notifications that Talon cannot support from the official app, at this time, will be dismissed as well. Talon does not currently have a way to blacklist these notifications so they don't get dismissed. If you want favorite user notifications, you can set them up through Talon, by favoriting that user within my app, then turning on a background refresh interval for the home timeline." + brbr() +

          "<b>How to set it up</b>" + br() +
          "<ol>" +
            "<li>Make sure the official Twitter app is installed and set up to provide you with notifications</li>" +
            "<li>Head to the <i>Notification Options</i> section of settings</li>" +
            "<li>Turn on <i>Twitter Interceptor</i> from the top option in that section</li>" +
            "<li>Give Talon permission to listen for notifications (the screen to do this will come up automatically)</li>" +
            "<li>That's it!</li>" +
          "</ol>" + br() +

          "<b>Debugging issues</b>" + br() +
          "If the official Twitter app's notifications aren't getting dismissed, make sure you have given Talon permission to read your notifications, then try restarting your phone. Android controls this service and access to the notifications. Sometimes a restart is required for them to start it again." + brbr() +
          "If the official Twitter app's notifications are getting dismissed and no notifications are coming up from Talon, you probably fall into the subset of people that Talon's <i>Activity</i> section isn't going to work for. Learn more about that section in the \"Activity\" topic, below."
  }, {
    keywords: "favorite-user notifications favorite",
    title: "How do I get notified when a favorite user tweets?",
    text: "Three things are required to make favorite user notifications work, in Talon:" +
          "<ol>" +
            "<li>You have to have favorited a user within Talon. You can do this from their profile.</li>" +
            "<li>You must set a background refresh interval for the timeline (under Sync Settings).</li>" +
            "<li>You must turn on <i>Favorite User Notifications</i> (under Notification Settings).</li>" +
          "</ol>"
  }]
}, {
  title: "Talon Features and UI Help/Customization",
  items: [{
    keywords: "quick-actions like retweet quote timeline",
    title: "Can I enable some kind of quick actions to like, retweet, quote, etc, right from the timeline?",
    text: "Talon has the ability to perform quick actions on tweets by pressing the date (in the top right corner) of any tweets on your timeline." + brbr() +
          "Quick Actions include: share, reply, quote, like, and retweet." + brbr() +
          "Right now, there are no plans to implement these options directly onto the timeline, they will remain hidden, to be shown when clicking the date.﻿ These quick actions are also not available when using the <i>Timeline Style Tweet Layout</i>"
  }, {
    keywords: "jump-to-top timeline top jump",
    title: "How can I jump to the top of the timeline?",
    text: "You have a few options to quickly jump to the top of your timeline:" +
          "<ol>" +
            "<li>Simply long click the app bar to go directly to the top of your timeline.</li>" +
            "<li>Tap the App Bar to see how many tweets from the top you are, and access a <i>To Top</i> button on the Snackbar.</li>" +
            "<li>Enable the <i>Use Snackbar</i> feature in UI settings to have easier access to this Snackbar that allows you to jump to the top of the timeline.</li>" +
          "</ol>" +
          "Bonus Round: If you like to see the Snackbar all the time, then head to UI Settings and enable the <i>Static UI</i> feature."
  }, {
    keywords: "auto-play gifs videos media timeline",
    title: "Can I auto-play Twitter GIFs and videos on the timeline?",
    text: "Yes, enable this from the <i>Data Saver</i> section of settings."
  }, {
    keywords: "auto-play gifs videos media timeline",
    title: "Can I auto-play Twitter GIFs and videos on the timeline?",
    text: "Yes, enable this from the <i>Data Saver</i> section of settings."
  }, {
    keywords: "compact-layout show-more screen",
    title: "Talon's tweets take up a lot of screen space. Can I use a more compact layout?",
    text: "Yes. There are <i>Compact Layout</i> options in the <i>App Style</i>, <i>Tweet Style</i> section of the app." + brbr() +
          "Enabling this will ignore some of the other configuration options available in that section of settings. This layout isn't really meant to be customized, it is meant for those that just want to fit as much information as they can, on the screen."
  }, {
    keywords: "compact-layout show-more screen",
    title: "Talon's tweets take up a lot of screen space. Can I use a more compact layout?",
    text: "Yes. There are <i>Compact Layout</i> options in the <i>App Style</i>, <i>Tweet Style</i> section of the app." + brbr() +
          "Enabling this will ignore some of the other configuration options available in that section of settings. This layout isn't really meant to be customized, it is meant for those that just want to fit as much information as they can, on the screen."
  }, {
    keywords: "list remove-user",
    title: "How do I remove a user from a list?",
    text: "From user profiles, you can easily add users to your lists, but removing them from the lists is not within the profiles." + brbr() +
          "To view users in a list, head to the list section of the drawer, then long click the list you are looking at. From there, you can view the users within that list, and remove them by clicking on them."
  }, {
    keywords: "navigation-bar",
    title: "Why is the navigation bar covering the UI?",
    text: "Unfortunately, there is not a direct method in Android to tell if the user is using a navigation bar on their device or if they have hardware buttons. Most of the time I am able to find it automatically, but on some devices this will never work." + brbr() +
          "Since some of Talon's layout depend pretty heavily on whether or not you have a navigation bar, Talon allows you to specify it manually from UI Settings." + brbr() +
          "If the automatic method is working for you, there is no reason to use this setting."
  }, {
    keywords: "fab app-bar snackbar hide scrolling opposite",
    title: "Why do the <i>app bar</i>, <i>snackbar</i>, and <i>floating action button</i> hide the way they do?",
    text: "By default, these UI extras hide as you are scrolling up the timeline. This is different than many apps do it, but that is because Talon is designed to be used in a bottom up approach." + brbr() +
          "It is assumed that you are seeing all new tweets as you scroll up from your current position and that you have already gone over the tweets as you scroll down. So, when viewing the new tweets, Talon will give you the full screen, but when checking out old tweets, you will see these UI extras/navigation helpers on the screen as well." + brbr() +
          "If you would rather have the app use the top-down style (similar to Google+), there is an option for this under Other Options in settings."
  }, {
    keywords: "second-account two-account two account limit token",
    title: "Talon supports two accounts. How do I log in to the second account?",
    text: "Talon supports up to two accounts. It won't be more than that because of Twitter's token limit, which limits the number of users a third party app can have." +
          "If you want to add your second account, simply click the down arrow on the right side of the main drawer, then the <i>New Account</i> text."
  }, {
    keywords: "muffle mute users timeline",
    title: "What are muffled and muted users?",
    text: "Talon supports two different options to limit the amount of content that you see from your followers." + brbr() +
          "The first, and more boring, is the traditional mutes:" +
          "<ul>" +
            "<li>You can mute a user, or their retweets (by opening their profile and hitting the three dot overflow menu)</li>" +
            "<li>You can mute clients (by long clicking on the client text from the tweet viewer)</li>" +
            "<li>You can mute expressions, any text you want (from the <i>Mute Management</i> section of settings)</li>" +
            "<li>You can mute hashtags (by long clicking the hashtag)</li>" +
          "</ul>" +
          "The second option, and much more Talon specific, is muffling. Talon allows you to muffle a user from their profile, which means to show a minimized version of that user's tweets on the timelines. Try it out to see what the minimized version looks like!" + brbr() +
          "At this time, mutes are applied only to your main, swipable timelines, not to profiles, searches, etc. This is something I plan to expand on in the future."
  }, {
    keywords: "customize swipable-pages homescreen launchscreen start-screen",
    title: "How can I customize the swipable pages that appear around the timeline?",
    text: "Talon allows you to fully customize up to 8 pages that you can swipe between on the timeline. To do this, simply go to <i>Main Pages and Drawer Settings</i>, then <i>Configure Swipable Pages</i>" + brbr() +
          "You can choose from any of these types of pages:" +
          "<ul>" +
            "<li>Home Timeline</li>" +
            "<li>Mentions Timeline</li>" +
            "<li>Direct Messages</li>" +
            "<li>List Timeline</li>" +
            "<li>Favorite User Tweets Timeline</li>" +
            "<li>Timeline of only tweets with links</li>" +
            "<li>Timeline of only tweets with pictures</li>" +
            "<li>Second Account Mentions Timeline</li>" +
            "<li>World and local trends</li>" +
            "<li>Saved searches</li>" +
            "<li>Twitter activity timeline</li>" +
            "<li>Saved Tweets</li>" +
            "<li>Plus more</li>" +
          "</ul>"
  }, {
    keywords: "theme-engine talon-classic",
    title: "Talon Classic's theme engine",
    text: "Sorry, this will never be coming to the Material Design version of Talon." + brbr() +
          "While this theme engine was awesome, and something not many had done before EvolveSMS and Talon for Twitter, it ended up being wayyy more restrictive than we could have ever imagined. It was hard to work around issues and it was had to get a consistent experience across devices." + brbr() +
          "It was taken out so that the app could progress forward. Much of what you see in Talon today, would not have been possible with the theme engine from the old version."
  }, {
    keywords: "like retweet quote statistics information",
    title: "How can I see who has liked, retweeted, and quoted my status?",
    text: ""
  }]
}, {
  title: "Twitter Limitations",
  items: [{
    keywords: "polls surveys group-direct-messages direct-messages dm",
    title: "Support for Twitter polls and group direct messages",
    text: "At this time, Twitter provides no access to either of these services, for third party apps. If this changes in the future, Talon will be updated to include them."
  }, {
    keywords: "profile-pictures loading empty blank",
    title: "Some profile pictures don't show in Talon?",
    text: ""
  }, {
    keywords: "threads conversations replies loading reply",
    title: "How conversations/threads are loaded and why they don't always show everything.",
    text: ""
  }, {
    keywords: "activity notifications",
    title: "How does the activity page work?",
    text: ""
  }, {
    keywords: "login log-in information",
    title: "Login Issues",
    text: ""
  }, {
    keywords: "second-account two-account two account limit token",
    title: "Why is Talon limited to two accounts?",
    text: ""
  }, {
    keywords: "rate-limiting loading spinning",
    title: "What is rate limiting and why does it stop some parts of the app from loading?",
    text: ""
  }]
}, {
  title: "More Help",
  items: [{
    keywords: "battery data limit consumption",
    title: "Battery/Data consumption",
    text: ""
  }, {
    keywords: "translation translate language",
    title: "Can I help translate Talon?",
    text: ""
  }, {
    keywords: "contact email feature-request bug-report",
    title: "How can I get in touch with you?",
    text: ""
  }]
}]

function link(text, link) {
  return "<a href=\"" + link + "\" target=\"blank\">" + text + "</a>";
}

function brbr() {
  return br() + br();

}

function br() {
  return "<br/>";
}
