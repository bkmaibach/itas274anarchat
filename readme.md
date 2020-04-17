## Enviroment Setup ##

Run through the react native enviroment setup here:

https://reactnative.dev/docs/environment-setup

You will need to do the React Native CLI Quickstart not the Expo.

Install all the dependancies with:

    npm install

To start the metro bundler server

    npm start

Then in another terminal in the same location, compile the code and launch it into the bundler:

    yarn android


You will need to either have a running virtual android device or have
a physical device connected directly to your computer with USB debugging enabled.

## Overview of Components ##

### Navigation ###
** See ChatNavigator.tsx, App.tsx, and the screens folder. **

** Resources used: **

* [https://reactnavigation.org/]


The navigator is the system that defines which screens are available. Because the ChatNavigator
is a stack navigator, that means the back button on an android device will easily bring the user
back to the previous screen, "popping" that screen off a stack.

The navigator also defines some parameters each screen will use. For example, in the ConvoScreen
the route params recipientId and publicKey are determined by the touch event in the previous
screen (ConvoListScreen) and then are used in bringing dpwn the conversation with that contact.
Route params are also used in the ChatNavigator file itself, in the definition of the title (the
colored header at the top of the screen). Other stylistic choices and the header button on the
ConvoListScreen are also defined in the ChatNavigator.

### Firebase ##
** See Fire.tsx and ConvoScreen.tsx **

** Resources used: **

* [https://www.youtube.com/watch?v=eR1vP-W1emI]
* [https://github.com/FaridSafi/react-native-gifted-chat]

This project uses the firebase Real Time (RT) Database to hold conversations. With Expo managed
worksflow having been removed ("ejected") from the project, it is possible that this could be
upgraded to Firestore, but the current implementation seems to work fine. The RT database holds
a single object containing conversations or "convos". Convos in turn hold an array of messages,
each marked with the sending user ID, signature, and timestamp.

Each device has a user ID that is accessible through the Fire object that uniquely identifies
that participant. Convos are identified by a concatenation of these IDs, with the first ID
alphabetically coming first in the conversation ID.

The ConvoScreen component works closely with the Fire singleton to fetch and update data on
the RT DB. This works in conjunction with react-native-rsa-native to provide encrypted and
nonrepudiated messages between participants. Within the useEffect hook on the ConvoScreen,
a get callback is registered that runs once for every existing message, and then again for
each new messages. Within this callback the messages are decrypted using the appropriate key,
and verified using the opposite party's public key (stored locally on the users device).

Future work on this project should ensure that messages encrypted using the other participant's
public key can be persisted in unencrypted form, as once the message is encrypted only the
receving participant's private key can be used to decrypt the message. This could be accomplished
by creating a new SQLite table and a conditional within the get callback that either decrypts
incomming messages or fetches previously sent messages depending on the source.

### SQLite ###
** See Contact.tsx, ConvoListScreen.tsx, and NewConvoScreen.tsx **

** Resources used: **

* [https://github.com/andpor/react-native-sqlite-storage]

This is the code that interacts with the local SQLite database. This database is what holds
the public keys and chosen aliases identified by a particular ID.

Within NewConvoScreen, a user scans a QR code containing a public key and a user ID. These
are bundled with the entered human-readble alias and stored in a row in the contacts table
to be used later.

### QR Based Key Exchange System ###

** See NewConvoScreen.tsx **

** Resources used: **

* [https://github.com/moaazsidat/react-native-qrcode-scanner]
* [https://github.com/awesomejerry/react-native-qrcode-svg#readme]

This screen makes use of two technologies, one for generating QR codes and one for scanning
them. This provides a means for the sharing of public keys that allow encryption and
verification. Once the values are scanned, they are parsed and then saved in the database.