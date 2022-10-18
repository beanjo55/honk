import { Client, Message, GuildTextableChannel, User } from "eris";
import { config as deConfig } from "dotenv";

deConfig();

import config from "./config";

type fuckingSTRING = `${string}:${string}`;

class Honk {
  private client: Client;
  private typeTimers = new Map<
    fuckingSTRING,
    {
      timeout: NodeJS.Timeout;
      timeStarted: number;
    }
  >();
  constructor() {
    this.client = new Client(`Bot ${config.token}`, {
      allowedMentions: {
        everyone: false,
        roles: false,
        users: true,
      },
      defaultImageFormat: "png",
      defaultImageSize: 4096,
      intents: 36355,
    });
    this.client.connect();
    this.client.on("messageCreate", this.onMessage);
    this.client.on("typingStart", this.onTypingStart);
  }

  onMessage = (message: Message) => {
    if (message.author.bot) {
      return;
    }

    const channelString: fuckingSTRING = `${message.channel.id}:${message.author.id}`;
    const typingStart = this.typeTimers.get(channelString);
    if (typingStart) {
      clearInterval(typingStart.timeout);
      this.typeTimers.delete(channelString);
    }

    if (message.content === "honk") {
      message.channel.createMessage("honk").catch(() => null);
    }

    //random int between 0 and 100
    const random = Math.floor(Math.random() * 100);
    if (random === 69) {
      this.client.createMessage(message.channel.id, "nice");
    }
    const random2 = Math.floor(Math.random() * 1000);
    if (random2 === 420 && message?.member && client.getRESTGuildMember(message.guildID, client.user.id).?permissions?.has(BigInt(134217728)) {
      this.client.editGuildMember(message.guildID, message.member.id, { nick: 'honk' }, 'honk :3')
    }
  };

  onTypingStart = (channel: GuildTextableChannel, user: User) => {
    const channelString: fuckingSTRING = `${channel.id}:${user.id}`;

    const clearTimeout = () => {
      this.typeTimers.delete(channelString);
    };

    if (!this.typeTimers.has(channelString)) {
      this.typeTimers.set(channelString, {
        timeout: setTimeout(clearTimeout, 10000),
        timeStarted: Date.now(),
      });
      return;
    } else {
      const { timeout, timeStarted } = this.typeTimers.get(channelString)!;
      clearInterval(timeout);
      this.typeTimers.set(channelString, {
        timeStarted,
        timeout: setTimeout(clearTimeout, 10500),
      });

      if (timeStarted + 1000 * 60 * 5 <= Date.now()) {
        this.client
          .createMessage(channel.id, `<@${user.id}> honk`)
          .catch(() => null);
        this.typeTimers.delete(channelString);
      }
    }
  };
}

new Honk();
