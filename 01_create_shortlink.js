  // code grabbed from here https://botpress.com/docs/messaging-channels/botpress-webchat/customizations/custom-css
  const chatOptions = {
    hideWidget: true,
    config: {
      enableReset: true,
      enableTranscriptDownload: true,
      extraStylesheet: '/assets/modules/channel-web/chat.css',
      // botName: "Bot Emulator",
      // botConvoDescription: "Test your bot live",
      // enableArrowNavigation: false,
      showConversationsButton: false,
      // useSessionStorage: false,
      // showUserName: false,
      // showUserAvatar: false,
      // showTimestamp: false,
      // disableAnimations: true,
      // hideWidget: true,
      showPoweredBy: false,
      // enablePersistHistory: true,
      enableResetSessionShortcut: true,
      // enableVoiceComposer: false,
      enableConversationDeletion: true,
      // closeOnEscape: true,
      // isEmulator: true,
      // botId: "example",
      // userIdScope: "studio",
      sendUsageStats: true,
      // containerWidth: 300,
      // layoutWidth: 300,
      // disableNotificationSound: false
    }
  }

  const params = {
    m: 'channel-web',
    v: 'Fullscreen',
    options: JSON.stringify(chatOptions)
  }

  setTimeout(() => {
    try {
      bp.http.deleteShortLink(botId)
    } catch (e) {}

    // Chatbot will be available at $EXTERNAL_URL/s/$BOT_NAME
    bp.http.createShortLink(botId, `${process.EXTERNAL_URL}/s/${botId}/`, params)
  }, 500)